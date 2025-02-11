import { colorsV3 } from '@hedviginsurance/brand'
import { action } from '@storybook/addon-actions'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { TextKeyProvider } from 'utils/textKeys'
import { RedeemCode } from './RedeemCode'

export default {
  title: 'Forever/RedeemCode',
  component: RedeemCode,
  parameters: {
    backgrounds: [{ name: 'gray900', value: colorsV3.gray900, default: true }],
  },
}

export const Default = () => (
  <MemoryRouter initialEntries={['/se/forever/abc123']}>
    <TextKeyProvider locale="en">
      <div
        style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <RedeemCode onSubmit={action('Submit')} referralCode="abc123" />
      </div>
    </TextKeyProvider>
  </MemoryRouter>
)
