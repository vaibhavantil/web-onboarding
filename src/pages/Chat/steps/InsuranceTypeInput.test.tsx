import { InputValidationError } from 'components/userInput/UserResponse'
import { Provider } from 'constate'
import { InsuranceType } from 'containers/OfferContainer'
import { mount } from 'enzyme'
import * as React from 'react'
import { MockTextKeyProvider } from 'utils/MockTextKeyProvider'
import { createSession } from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { WithStorageProps } from 'utils/StorageContainer'
import { InsuranceTypeInput } from './InsuranceTypeInput'

it('handles form changes', () => {
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <MockTextKeyProvider
        textKeys={{
          CHAT_INPUT_INSURANCE_TYPE_TEXT: '{insuranceType} {size}',
        }}
      >
        <InsuranceTypeInput isCurrentMessage />
      </MockTextKeyProvider>
    </Provider>,
  )

  expect(wrapper.find('button')).toHaveLength(0)

  wrapper
    .find('select#insuranceType')
    .simulate('change', { target: { value: InsuranceType.RENT } })
  expect(wrapper.find('select#insuranceType').prop('value')).toBe(
    InsuranceType.RENT,
  )
  wrapper.find('input#size').simulate('change', { target: { value: 42 } })
  expect(wrapper.find('input#size').prop('value')).toBe(42)

  expect(wrapper.find('button')).toHaveLength(1)
})

it('handles too big apartment', () => {
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <MockTextKeyProvider
        textKeys={{
          CHAT_INPUT_INSURANCE_TYPE_TEXT: '{insuranceType} {size}',
        }}
      >
        <InsuranceTypeInput />
      </MockTextKeyProvider>
    </Provider>,
  )

  expect(wrapper.find(InputValidationError)).toHaveLength(0)
  wrapper.find('input#size').simulate('change', { target: { value: 1337 } })
  expect(wrapper.find('input#size').prop('value')).toBe(1337)
  expect(wrapper.find(InputValidationError)).toHaveLength(1)
})
