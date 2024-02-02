import React from 'react'
import Head from "next/head"

const About = () => {
  return (
    <>
    <Head>
     <title>About Us - Travel</title>
     <meta name="description" content="Learn more about our company, our values and our team."/>
    </Head>
    <div className="flex flex-col bg-sky-100 p-8 sm:p-16 lg:p-20">
        <div className="font-bold text-2xl md:text-3xl lg:text-4xl pb-6 sm:pb-10 text-sky-900">About Us</div>
        <div>
        <div className="font-md whitespace-pre-wrap mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div className="font-md whitespace-pre-wrap mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        </div>
    </div>
    </>
  )
}

export default About