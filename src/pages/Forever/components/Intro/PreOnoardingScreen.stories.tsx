import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { PreOnboardingScreen } from './PreOnboardingScreen'

export default {
  title: 'Forever/Intro/PreOnboardingScreen',
  component: PreOnboardingScreen,
  parameters: {
    backgrounds: [{ name: 'gray900', value: colorsV3.gray900, default: true }],
  },
}

export const Default = () => (
  <BrowserRouter>
    <div style={{ height: '100vh', color: '#fff' }}>
      <PreOnboardingScreen />
    </div>
  </BrowserRouter>
)
