'use client'
import React from 'react'
import useOnClickOutside from "~/hooks/closeModal"
import type {
  NextPage,
} from "next";
import {BsChatRightDots} from "react-icons/bs"
import {RiCloseFill} from 'react-icons/ri'

type chatProps = {
  closeChatModal: () => void
}

const Chat: NextPage<chatProps>  = ({closeChatModal}) => {

  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  useOnClickOutside(ref, () => closeChatModal());


  return (
    <div>
        <div className="z-80 fixed bottom-0 right-0 sm:-right-4 lg:-right-5 sm:translate-x-24  ">
            <div ref={ref} className="border-black sm:w-3/4 bg-white rounded-lg px-2 pt-2 pb-4 shadow-2xl m-2" >
            <div className="flex justify-end">
                <button type="button" onClick={closeChatModal} className="hover:bg-gray-200 rounded-full hover:text-white text-slate-700 text-xl sm:p-1">
                <RiCloseFill/>
                </button>
                </div>
              <div className="border-b-2 border-black">
                <div className="flex flex-row gap-2 sm:text-xl lg:text-2xl ml-2"> 
                  <BsChatRightDots/>
                  <h1>Live Chat</h1>
                </div>
              </div>
              <div className="flex flex-col  m-4 p-2 bg-slate-100 rounded-lg sm:text-md">
                <h2>None of our agents are currently available.</h2>
                <h2 className="text-wrap">Get in touch with us by sending an email to <strong>agents@travel.com</strong></h2>
              </div>
            </div>
        </div>  
    </div>
  )
}

export default Chat