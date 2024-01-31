import { type NextPage } from "next";
import Head from "next/head";
import React from 'react'
import Landing from "~/components/landing/Landing";



const Home: NextPage = () => {


  return (
    <>
      <Head>
        <title>Travel app</title>
      </Head>
     <Landing/>
      
    </>
  );
};

export default Home;
