import { CookieStorage } from 'cookie-storage'
import * as md5 from 'md5'
import { SegmentAnalyticsJs, setupTrackers } from 'quepasa'
import { InsuranceType } from './insuranceDomainUtils'

const cookie = new CookieStorage()

export interface UtmParams {
  source?: string
  medium?: string
  term?: string
  content?: string
  name?: string
}

export const getUtmParamsFromCookie = (): UtmParams | undefined => {
  const params = cookie.getItem('utm-params')
  try {
    return params ? JSON.parse(params) : undefined
  } catch (e) {
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      ;(window as any).Sentry.captureMessage(
        'Error parsing UTM-parameters: ' + params,
      )
    }
    return undefined
  }
}

export enum ApplicationSpecificEvents {
  COMPLETED = 'completed',
}

const NOOP = () => {} // tslint:disable-line

export const { TrackAction, IdentifyAction } = setupTrackers<
  ApplicationSpecificEvents
>(
  () => {
    if (typeof window !== 'undefined') {
      const castedWindow = window as any
      return castedWindow.analytics as SegmentAnalyticsJs
    }
    return { track: NOOP, identify: NOOP }
  },
  { debug: process.env.NODE_ENV === 'development' },
)

const adtractionProductMap: { [type in InsuranceType]: number } = {
  BRF: 1417356498,
  STUDENT_BRF: 1423041022,
  RENT: 1417356528,
  STUDENT_RENT: 1412601108,
  HOUSE: 0,
}

export const adtraction = (
  orderValue: number,
  orderId: string,
  emailAddress: string,
  couponCode: string | null,
  insuranceType: InsuranceType,
) => {
  try {
    if (insuranceType === InsuranceType.House) {
      return
    }
    const adt = ADT
    adt.Tag = adt.Tag || {}
    adt.Tag.t = 3
    adt.Tag.c = 'SEK'
    adt.Tag.am = orderValue
    adt.Tag.ti = orderId
    adt.Tag.xd = md5(emailAddress)

    if (couponCode !== null) {
      adt.Tag.cpn = couponCode
    }

    adt.Tag.tp = adtractionProductMap[insuranceType]
    adt.Tag.doEvent()
  } catch (e) {
    ;(window as any).Sentry.captureMessage(e)
  }
}

export const trackStudentkortet = (memberId: string, amount: string) => {
  const iframe = document.createElement('iframe')
  iframe.src = `https://studentkortet.go2cloud.org/aff_l?offer_id=68&adv_sub=${memberId}&amount=${amount}`
  iframe.scrolling = 'no'
  iframe.frameBorder = '0'
  iframe.width = '1'
  iframe.height = '1'
  document.body.appendChild(iframe)
}
