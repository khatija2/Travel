

import React from 'react'
import Image from 'next/image'
import Search from "./Search"
import Popular from "./Popular"
import Specials from "./Specials"
import Newsletter from "./Newsletter"
import {BsChatRightDots} from "react-icons/bs"
import {AiOutlineCheck} from 'react-icons/ai'
import Calendar from "../modals/Calendar"
import Holiday_types from "../modals/Holiday_types"
import Destination from "../modals/Destination"


const Landing = () => {
  return (
   <div className="font-figtree">
    <Destination closeModal landing={true}/>
    <Holiday_types/>
    <Calendar/> 
    <div className="z-50 fixed bottom-2 sm:bottom-4 right-2 sm:right-4"><button className="bg-indigo-900 border border-gray-50 p-2 text-xs sm:text-lg flex flex-row items-center justify-center gap-1 shadow-lg text-white rounded-lg hover:opacity-50"><BsChatRightDots/>Let's Chat</button></div>
    <div className=" bg-mauritiusBanner z-0 flex flex-col items-center justify-center bg-cover bg-center h-full w-full sm:h-1/2">
      <Search/>
      <Specials/>
    </div>
    <Popular/>  
    <div className="relative w-full flex items-center justify-center">
      <div className="relative h-full w-4/5 2xl:w-3/4 rounded-lg flex flex-row px-4 pb-4 ">
        <div className="sm:flex sm:flex-row w-full bg-white rounded-lg border border-gray-200">
          <div className="w-full h-48 sm:h-full flex justify-center sm:flex-1 "><Image src="/images/amalfi.jpeg" alt="almafi coast" height={48} width={500} className="rounded-t-lg sm:rounded-none sm:rounded-l-lg"></Image></div>
            <div className="p-5 flex sm:w-3/4 flex-col">
              <h1 className="mb-3 sm:text-xl font-bold">Let us assist you!</h1>
              <ul className="flex flex-col gap-2 text-sm">
                <li className="flex flex-row gap-2"><span><AiOutlineCheck color="green"/></span><p>Service</p></li>
                <li className="flex flex-row gap-2"><span><AiOutlineCheck color="green"/></span><p>Peace of Mind</p></li>
                <li className="flex flex-row gap-2"><span><AiOutlineCheck color="green"/></span><p>Value for Money</p></li>
                <li className="flex flex-row gap-2"><span><AiOutlineCheck color="green"/></span><p>Travel made Easy</p></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    <Newsletter/>
   </div>
  )
}

export default Landing

