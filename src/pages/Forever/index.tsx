import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import {
  LOCALE_PATH_PATTERN,
  useCurrentLocale,
} from 'components/utils/CurrentLocale'
import { Page } from 'components/utils/Page'
import { SessionContainer } from 'containers/SessionContainer'
import { Intro } from 'pages/Forever/components/Intro'
import React from 'react'
import Helmet from 'react-helmet-async'
import { RouteComponentProps } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { RedeemCode } from './components/RedeemCode'
import { useRedeemCode } from './useRedeemCode'

type ForeverProps = RouteComponentProps<{
  code: string
}>

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-left: 1.625rem;
  padding-right: 1.625rem;
  color: ${colorsV3.gray500};
  background-color: ${colorsV3.gray900};

  @media (min-width: 800px) {
    padding-left: 3.75rem;
    padding-right: 3.75rem;
  }
`

const Header = styled.header`
  display: flex;
  justify-content: center;
  padding-top: 1.25rem;
  padding-bottom: 1.15rem;

  @media (min-width: 800px) {
    justify-content: space-between;
    padding-top: 2.5rem;
  }
`

const LogoLink = styled.a`
  color: ${colorsV3.gray100};
`

export const Forever: React.FC<ForeverProps> = ({
  match: {
    params: { code },
  },
}) => {
  const currentLocale = useCurrentLocale()
  const textKeys = useTextKeys()
  const { handleSubmit } = useRedeemCode()
  return (
    <>
      <Helmet>
        <title>{textKeys.FOREVER_LANDINGPAGE_TITLE()}</title>
        <meta
          property="og:title"
          content={textKeys.FOREVER_LANDINGPAGE_TITLE()}
        />
        <meta
          property="og:description"
          content={textKeys.FOREVER_LANDINGPAGE_DESCRIPTION()}
        />
        <meta
          property="og:image"
          content="https://www.hedvig.com/new-member-assets/social/hedvig-forever.png"
        />
      </Helmet>
      <SessionContainer>
        {() => (
          <Page>
            <Global
              styles={css`
                body {
                  background-color: ${colorsV3.gray900};
                }
              `}
            />
            <PageWrapper>
              <Header>
                <LogoLink href={'/' + currentLocale}>
                  <HedvigLogo width={94} />
                </LogoLink>
              </Header>

              <Switch>
                <Route
                  path={LOCALE_PATH_PATTERN + '/forever/:code?'}
                  exact
                  render={() => (
                    <RedeemCode referralCode={code} onSubmit={handleSubmit} />
                  )}
                />
                <Route
                  path={LOCALE_PATH_PATTERN + '/forever/:code/intro'}
                  component={Intro}
                />
              </Switch>
            </PageWrapper>
          </Page>
        )}
      </SessionContainer>
    </>
  )
}
