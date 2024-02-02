'use client'
import React from 'react'
import type {
  NextPage,
} from "next";
import Image from 'next/image'
import Popular from "./Popular"
import Specials from "./Specials"
import Newsletter from "./Newsletter"
import {AiOutlineCheck} from 'react-icons/ai'
import PageSearch from "../search-bars/PageSearch"


const Landing: NextPage = () => {
  return (
   <div className="font-inter">
    <div className=" bg-gradient-to-b from-sky-100 to-sky-800 h-1/2 w-full">
    <div className="z-0 flex flex-col items-center justify-center bg-center h-full w-full">
      <PageSearch category="Destination" category2="Travel category" landing={"landing"} />
      <Specials/>
    </div>
    </div>
    <Popular/>  
    <div className="relative w-full flex items-center justify-center">
      <div className="relative h-full w-4/5 2xl:w-3/4 rounded-lg flex flex-row px-4 pb-4 ">
        <div className="flex flex-col sm:flex-row w-full bg-white rounded-lg border border-gray-200">
          <div className="w-auto h-full sm:h-full flex justify-center sm:flex-1 "><Image src="/images/Amalfi.jpeg" alt="almafi coast" objectFit="cover" width={640} height={480} className="rounded-t-lg sm:rounded-none sm:rounded-l-lg"></Image></div>
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

