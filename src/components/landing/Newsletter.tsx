'use client'
import React from 'react'
import Link from 'next/link'
import { useState } from "react";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import {AiOutlineFacebook} from 'react-icons/ai' 
import {AiOutlineInstagram} from 'react-icons/ai'
import {AiOutlineMail} from 'react-icons/ai'
import { toast } from "react-hot-toast";

const Newsletter: NextPage = () => {

  const [input, setInput] = useState("");

  const { mutate, isLoading: isAdding } = api.contacts.contactCreate.useMutation( {

    onSuccess: () => {
      setInput("");
      toast.success("Your email has been added to our contact list. Please check your email for more details")
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to add email! Please try again later.");
      }
    },
  });


  const handleEmailChange = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input) === true) {
      mutate({ email: input })
    }
    else {
      toast.error("Invalid email. Please check that your email address is correct!")
    }
  }


  return (
    <div className="flex flex-col items-center justify-center mx-2 sm:mx-8 sm:my-8 p-2 border border-gray-200 rounded-lg bg-sky-50">
      <h1 className="font-bold text-center">Want to keep up with our latest deals?</h1>
      <h2>Sign up for our newsletter!</h2>
      <div className="flex flex-row justify-center gap-2 py-2 w-full">
        <div className="flex flex-row justify-start items-center sm:w-1/2 md:w-1/3 lg:w-1/4 2xl:w-1/5 relative text-gray-400"><AiOutlineMail size={18} className="absolute ml-4" />
        <input placeholder="Type your email here..." 
        type="email"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {handleEmailChange()}
          }
        }}
        disabled={isAdding}
        className="pl-10 border border-gray-500 rounded-lg outline-blue-400 p-4 w-full text-black"/></div>
        {input !== "" && !isAdding && (
        <button onClick={() => handleEmailChange()} className="bg-blue-700 hover:opacity-50 text-white font-bold p-2 sm:p-3 text-sm rounded-lg">Sign Up</button>
        )}
      </div>
      <h1>Simply click on the icons below to check out our social media pages and give us a follow!</h1>
      <div className="flex items-center gap-3 m-2 ">
          <span className="hover:text-sky-700"><Link href=""> <span className="sr-only">Facebook page</span><AiOutlineFacebook size={28}/></Link></span>
          <span className="hover:text-sky-700"><Link href=""> <span className="sr-only">Instagram page</span><AiOutlineInstagram size={28}/></Link></span>
      </div>
    </div>
  )
}

export default Newsletter