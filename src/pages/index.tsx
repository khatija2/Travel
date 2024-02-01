import { type NextPage } from "next";
import Head from "next/head";
import React from 'react'
import Landing from "~/components/landing/Landing";



const Home: NextPage = () => {


  return (
    <>
      <Head>
        <title>Travel app</title>
        <meta name="description" content="Travel agency web app"/>
        <link rel="icon" href="/images/t-flag.jpg" />
      </Head>
     <Landing/>
      
    </>
  );
};

export default Home;
