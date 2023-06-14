
import React from 'react'
import Chat from '../../../components/chat'
import ChatInput from '../../../components/chatInput'

type Props = {
    params : {
        id : string
    }
}
const ChatPage = ({ params : { id }} : Props) => {
  return (
    <div className='flex flex-col h-screen overflow-hidden'>
        <Chat chatId={id} />
        <ChatInput chatId={id} />
    </div>
  )
}

export default ChatPage