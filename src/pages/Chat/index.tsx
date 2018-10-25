import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { TopBar, TopBarFiller } from '../../components/TopBar'
import { ChatConversation } from './ChatConversation'
import { OfferCreationHandler } from './components/OfferCreationHandler'
import { ResetButton } from './ResetButton'

export const Chat: React.SFC = () => (
  <>
    <TranslationsConsumer textKey="CHAT_PAGE_TITLE">
      {(title) => <Helmet>{<title>{title}</title>}</Helmet>}
    </TranslationsConsumer>

    <TopBar progress={0} button={<ResetButton />} />
    <TopBarFiller />
    <ChatConversation />
    <OfferCreationHandler />
  </>
)
