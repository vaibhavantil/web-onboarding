import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand/dist'
import { CompleteQuote, useRedeemedCampaignsQuery } from 'data/graphql'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { Price } from '../components'
import { StartDate } from '../Introduction/Sidebar/StartDate'
import { WithEmailForm } from '../types'
import {
  getInsuranceType,
  insuranceTypeTextKeys,
  isMonthlyCostDeduction,
} from '../utils'
import { InsuranceSummary } from './InsuranceSummary'
import { SignSpacer } from './Sign'
import { UserDetailsForm } from './UserDetailsForm'

const Section = styled('div')`
  width: 100%;
`

const Title = styled('h1')`
  font-size: 3.5rem;
  line-height: 1;
  color: ${colorsV2.black};
  margin: 0;

  @media (max-width: 40rem) {
    font-size: 2rem;
    text-align: center;
  }
`

const Excerpt = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 0;

  @media (max-width: 40rem) {
    padding: 2rem 0;
  }
`

const StartDateWrapper = styled.div`
  position: relative;
  margin-top: 0.375rem;
  margin-bottom: 2rem;
`

const InsuranceTypeLabel = styled('div')`
  font-size: 0.75rem;
  color: ${colorsV2.gray};
  text-transform: uppercase;
`

const InsuranceType = styled('div')`
  font-size: 2rem;
  font-family: ${fonts.GEOMANIST};
  font-weight: 500;
  line-height: 1;

  @media (max-width: 40rem) {
    font-size: 1.5rem;
  }
`

interface Props extends WithEmailForm {
  firstQuote: CompleteQuote
  refetch: () => Promise<void>
}

export const CheckoutContent: React.FC<Props> = ({
  firstQuote,
  email,
  onEmailChange,
  refetch,
}) => {
  const textKeys = useTextKeys()
  const redeemedCampaignsQuery = useRedeemedCampaignsQuery()
  const monthlyCostDeduction = isMonthlyCostDeduction(
    redeemedCampaignsQuery.data?.redeemedCampaigns ?? [],
  )

  return (
    <>
      <Section>
        <Title>{textKeys.CHECKOUT_TITLE()}</Title>
        <Excerpt>
          <div>
            <InsuranceTypeLabel>{textKeys.SIDEBAR_LABEL()}</InsuranceTypeLabel>
            <InsuranceType>
              {textKeys[insuranceTypeTextKeys[getInsuranceType(firstQuote)]]()}
            </InsuranceType>
          </div>
          <div>
            <Price
              monthlyGross={firstQuote.insuranceCost.monthlyGross}
              monthlyNet={firstQuote.insuranceCost.monthlyNet}
              monthlyCostDeduction={monthlyCostDeduction}
              highlightAmount
            />
          </div>
        </Excerpt>

        <UserDetailsForm email={email} onEmailChange={onEmailChange} />

        <StartDateWrapper>
          <StartDate
            dataCollectionId={firstQuote.dataCollectionId}
            startDate={firstQuote.startDate}
            offerId={firstQuote.id}
            currentInsurer={firstQuote.currentInsurer || null}
            refetch={refetch}
          />
        </StartDateWrapper>

        <InsuranceSummary firstQuote={firstQuote} />

        <SignSpacer />
      </Section>
    </>
  )
}
