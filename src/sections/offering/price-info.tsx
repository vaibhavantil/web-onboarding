import * as React from 'react'
import styled from 'react-emotion'
import { colors, fonts } from '@hedviginsurance/brand'

const Container = styled('div')({
  marginTop: '70px',
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
})

export const InnerContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
})

const Card = styled('div')({
  marginTop: '70px',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: colors.WHITE,
  minWidth: '500px',
  '@media (max-width: 640px)': {
    width: '100%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})

export const Header = styled('h1')({
  fontFamily: fonts.MERRIWEATHER,
  fontSize: '32px',
  marginBottom: '10px',
  fontWeight: 'normal',
  textAlign: 'center',
  '@media (max-width: 640px)': {
    fontSize: '30px',
    width: '100%',
    paddingLeft: '0px',
    paddingRight: '0px',
  },
})

export const SubTitle = styled('p')({
  marginTop: '0px',
  fontSize: '16px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
})

const Price = styled('p')({
  marginBottom: '0px',
  marginTop: '40px',
  fontSize: '20px',
  fontWeight: 100,
  textAlign: 'center',
  color: colors.PURPLE,
})

const Time = styled('p')({
  marginBottom: '20px',
  marginTop: '0px',
  fontSize: '16px',
  fontWeight: 100,
  textAlign: 'center',
  color: colors.BLACK_PURPLE,
})

export const Line = styled('div')({
  width: '100%',
  backgroundColor: colors.LIGHT_GRAY,
  height: '1px',
})

const StartContainer = styled('div')({
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
})

const AppliedContainer = styled('div')({
  marginBottom: '20px',
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
})

const ImageIcon = styled('img')({
  marginBottom: '0px',
  marginTop: '0px',
  marginRight: '6px',
  width: '17px',
  height: '17px',
})

export const Label = styled('p')({
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '16px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
})

const InsuredLabel = styled('p')({
  marginLeft: '5px',
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '16px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
})

export const GetInsuredButton = styled('div')({
  paddingBottom: 40,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
})

export const LinkTag = styled('a')({
  backgroundColor: colors.GREEN,
  fontSize: '18px',
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 30px',
})

interface Props {
  alreadyInsured: boolean
  header: string
  subTitle: string
  price: string
  subscriptionTime: string
  startDate: string
  coverage: string
  getInsured: string
  iconWorld: any /*TODO: type fix*/
  iconClock: any /*TODO: type fix*/
  BackgroundImage: any /*TODO: type fix*/
  alreadyInsuredLabel: string
  todayLabel: string
}

interface MyComponentState { buttonIsHidden :  boolean }


export class PriceInfo extends React.Component<Props, MyComponentState> {

  componentDidMount() {
      window.addEventListener('scroll', this.hideButton);
    }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.hideButton);
  }

  constructor(props: Props) {
    super(props)
    this.hideButton = this.hideButton.bind(this);
    this.state = {
      buttonIsHidden: false,
    }
  }

  hideButton() {
    console.log(window.scrollY);
    if (window.scrollY > 415) {
      this.setState({
        buttonIsHidden: true,
      });
    }else if (window.scrollY < 415){
      this.setState({
        buttonIsHidden: false,
      });
    }
  }

  render() {
    return (
      /*TODO: Change strings to be handled by cms */
      <Container onScroll={this.hideButton}>
        <InnerContainer>
          <Card>
            <Header>{this.props.header}</Header>
            <SubTitle>{this.props.subTitle}</SubTitle>
            <Price>{this.props.price}</Price>
            <Time>{this.props.subscriptionTime}</Time>
            <Line />

            <StartContainer>
              <ImageIcon src={this.props.iconClock} />
              <Label>{this.props.startDate}</Label>
              <InsuredLabel>
                {this.props.alreadyInsured
                  ? this.props.alreadyInsuredLabel
                  : this.props.todayLabel}
              </InsuredLabel>
            </StartContainer>

            <AppliedContainer>
              <ImageIcon src={this.props.iconWorld} />
              <Label>{this.props.coverage}</Label>
            </AppliedContainer>

            <GetInsuredButton style={{visibility: this.state.buttonIsHidden ? 'hidden' : 'visible'}}>
              <LinkTag href="/">{this.props.getInsured}</LinkTag>
            </GetInsuredButton>
          </Card>
        </InnerContainer>
      </Container>
    )
  }
}
