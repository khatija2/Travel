'use client'
import React from 'react'
import { useState } from "react"
import {BsChatRightDots} from "react-icons/bs"
import Chat from "../modals/Chat"



const ChatButton = () => {

  const [showChatModal, setShowChatModal] = useState(false);

  const handleChatModal = () => {
    setShowChatModal(true)
  }

  const closeChatModal =() => {
    setShowChatModal(false)
  }

  return (
  <>
    <div className="z-50 fixed bottom-2 sm:bottom-4 right-2 sm:right-4"><button className="bg-indigo-900 border border-gray-50 p-2 text-xs sm:text-lg flex flex-row items-center justify-center gap-1 shadow-lg text-white rounded-lg hover:opacity-50" onClick={() => handleChatModal()} ><BsChatRightDots/>Let's Chat</button>
    {showChatModal && (<Chat closeChatModal={closeChatModal}/>)}
    </div>
  </>
  )
}

export default ChatButton