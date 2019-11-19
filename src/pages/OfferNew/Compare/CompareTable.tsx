import { colorsV2 } from '@hedviginsurance/brand'
import hexToRgba from 'hex-to-rgba'
import * as React from 'react'
import styled from 'react-emotion'
import { Checkmark } from '../../../components/icons/Checkmark'
import { DownArrow } from '../../../components/icons/DownArrow'
import { HedvigSymbol } from '../../../components/icons/HedvigSymbol'
import { Questionmark } from '../../../components/icons/Questionmark'
import { SubHeadingBlack } from '../components'
import { CompanyProperties, InsuranceProperties } from './types'

interface Props {
  insuranceProperties: InsuranceProperties
  primaryCompany: CompanyProperties
  otherCompanies: CompanyProperties[]
  currentCompany?: CompanyProperties
}

const Container = styled('div')`
  width: 100%;
  border-radius: 4px;
  display: flex;
  flex-flow: row;
  background-color: ${colorsV2.white};
  border: 1px solid ${colorsV2.lightgray};
`

const InsurancePropertiesSection = styled('div')`
  width: 100%;
  height: 100%;
  padding: 1.5rem 1.75rem;
  box-sizing: border-box;
`

const ColumnHead = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 3.625rem;
  height: 1.5rem;
`

const ColumnRow = styled('div')`
  display: flex;
  height: 1.25rem;
  margin-bottom: 1.5rem;
  color: ${colorsV2.gray};
  :last-child {
    margin-bottom: 0.875rem;
  }
`

const ColumnRowPrimaryContent = styled('span')`
  color: ${colorsV2.black};
  margin-right: 4px;
`

const InsurancePropertyNames = styled('div')``

const InsuranceProperty = styled(ColumnRow)`
  font-size: 1rem;
  letter-spacing -0.23px;
  flex-flow: row;
  align-items: center;
`

const InsurancePropertyHelpButton = styled('button')`
  width: 1rem;
  height: 1rem;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colorsV2.lightgray};
  border-radius: 50%;
  cursor: pointer;
  border: none;
  margin-left: 0.75rem;

  :focus {
    outline: none;
  }

  svg {
    width: 6px;
  }
`

const PrimaryCompanySection = styled('div')`
  width: 100%;
  max-width: 178px;
  height: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  background-color: ${colorsV2.lightgray};
  position: relative;

  :before,
  :after {
    content: '';
    position: absolute;
    left: 0;
    background-color: ${colorsV2.lightgray};
    width: 100%;
    height: 10px;
  }

  :before {
    top: -10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  :after {
    bottom: -10px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`

const PrimaryCompanyHead = styled(ColumnHead)`
  display: flex;
  justify-content: center;
`

const CompanyColumnRow = styled(ColumnRow)`
  font-size: 15px;
  justify-content: center;
  text-align: center;
  letter-spacing: -0.2px;
`

const OtherCompaniesSection = styled('div')`
  width: 100%;
  max-width: 178px;
  height: 100%;
  padding: 2rem 1rem;
  box-sizing: border-box;
  position: relative;
`

interface OtherCompanyHeadProps {
  currentCompany: CompanyProperties | null
  dropdownIsVisible: boolean
}

const OtherCompanyHead = styled('button')<OtherCompanyHeadProps>`
  width: 100%;
  display: flex;
  height: 1.5rem;
  align-items: center;
  justify-content: space-between;
  border: none;
  margin-bottom: 3.625rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) =>
    hexToRgba(
      colorsV2.black,
      props.currentCompany !== null && !props.dropdownIsVisible ? 1 : 0.2,
    )};
  transition: all 0.1s ease;
  cursor: pointer;

  :focus {
    outline: none;
  }

  > svg {
    width: 14px;
    transition: all 0.1s ease;
    ${(props) => props.dropdownIsVisible && `transform: rotate(180deg);`}
    ${(props) => props.dropdownIsVisible && `fill: ${colorsV2.violet500};`}
  }

  :hover {
    ${(props) => !props.dropdownIsVisible && `color: ${colorsV2.black};`}

    svg {
      fill: ${colorsV2.violet500};
    }
  }
`

const Dropdown = styled('div')<{ visible: boolean }>`
  background: ${colorsV2.white};
  width: 100%;
  position: absolute;
  height: calc(100% - 61px);
  left: 0;
  top: 3.75rem;
  transition: all 0.2s;
  opacity: ${(props) => (props.visible ? 0.9 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  padding: 1rem;
  box-sizing: border-box;
  border-top: 1px solid ${colorsV2.lightgray};
`

const DropdownRow = styled('button')`
  width: 100%;
  background: none;
  border: none;
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: left;
  color: ${colorsV2.darkgray};
  margin-bottom: 0.875rem;
  cursor: pointer;

  :focus {
    outline: none;
  }

  :hover {
    color: ${colorsV2.violet500};
  }
`

const getProperty = (key: string, value: any): any => {
  if (key === 'deductible') {
    return <ColumnRowPrimaryContent>{value} kr</ColumnRowPrimaryContent>
  }

  if (key === 'trustpilotScore') {
    return (
      <>
        <ColumnRowPrimaryContent>{value}</ColumnRowPrimaryContent> av 5
      </>
    )
  }

  return typeof value === 'string' ? (
    <ColumnRowPrimaryContent>{value}</ColumnRowPrimaryContent>
  ) : (
    <Checkmark />
  )
}

export const CompareTable = (props: Props) => {
  const [
    currentCompany,
    setCurrentCompany,
  ] = React.useState<CompanyProperties | null>(props.currentCompany || null)
  const [dropdownIsVisible, setDropdownIsVisible] = React.useState(false)

  return (
    <Container>
      <InsurancePropertiesSection>
        <ColumnHead>
          <SubHeadingBlack>Skydd</SubHeadingBlack>
        </ColumnHead>

        <InsurancePropertyNames>
          {Object.entries(props.insuranceProperties)
            .filter(([key]) => key !== 'name')
            .map(([key, property]) => (
              <InsuranceProperty key={key}>
                {property.name}
                <InsurancePropertyHelpButton>
                  <Questionmark />
                </InsurancePropertyHelpButton>
              </InsuranceProperty>
            ))}
        </InsurancePropertyNames>
      </InsurancePropertiesSection>

      <PrimaryCompanySection>
        <PrimaryCompanyHead>
          <HedvigSymbol />
        </PrimaryCompanyHead>

        {Object.entries(props.primaryCompany)
          .filter(([key]) => key !== 'name')
          .map(([key, property]) => (
            <CompanyColumnRow key={key}>
              {getProperty(key, property)}
            </CompanyColumnRow>
          ))}
      </PrimaryCompanySection>

      <OtherCompaniesSection>
        <OtherCompanyHead
          currentCompany={currentCompany}
          dropdownIsVisible={dropdownIsVisible}
          onClick={() => {
            setDropdownIsVisible(!dropdownIsVisible)
          }}
        >
          {currentCompany !== null && !dropdownIsVisible
            ? currentCompany.name
            : 'Välj försäkring'}
          <DownArrow />
        </OtherCompanyHead>
        <Dropdown visible={dropdownIsVisible}>
          {props.otherCompanies.map((company) => (
            <DropdownRow
              key={company.name}
              onClick={() => {
                setCurrentCompany(company)
                setDropdownIsVisible(false)
              }}
            >
              {company.name}
            </DropdownRow>
          ))}
        </Dropdown>
        {currentCompany &&
          Object.entries(currentCompany)
            .filter(([key]) => key !== 'name')
            .map(([key, property]) => (
              <CompanyColumnRow key={key}>
                {getProperty(key, property)}
              </CompanyColumnRow>
            ))}
      </OtherCompaniesSection>
    </Container>
  )
}
