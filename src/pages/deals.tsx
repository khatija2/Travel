import React from 'react'
import type {
  NextPage,
} from "next";
import ErrorPage from "next/error";
import { api } from "~/utils/api";
import { ssgHelper } from "~/server/api/ssgHelper";
import PageSearch from "~/components/search-bars/PageSearch"
import ResultsContainer from "~/components/ResultsContainer";
import { LoadingPage } from "~/components/Loading";
import Head from "next/head";
import Image from "next/image";




const Deals: NextPage = () => {

  const { data: deals, isLoading } = api.deals.getAll.useQuery();

  if (isLoading) return <LoadingPage/>;

  if (!deals) {
      return <ErrorPage statusCode={404} />;
    }

  const info = []
  for (let i =0; i < deals.length; i++) {
   const deal = deals[i]
   if (deal) {info.push(deal.profile)}
  }

 
  return (
    <>
    <Head>
    <title>Deals</title>
    <meta name="description" content="List of current special deals on offer."/>
   </Head>
    <div>
        <div className="bg-gradient-to-b from-sky-600 to-sky-900 z-0 flex flex-col items-center justify-center bg-cover bg-center shadow-lg h-full w-full sm:h-1/2">
        <div className="text-3xl sm:text-6xl font-bold text-white pt-4 sm:pt-10 font-nunito">Deals</div>
        <PageSearch/>
        </div>
        <ResultsContainer info={info}/>
    </div>
    </>
  )
}



export async function getStaticProps() {
   
  const ssg = ssgHelper();
  await ssg.deals.getAll.prefetch();
  
    return {
        props: { 
          trpcState: ssg.dehydrate(),
         },
      };
  }



export default Deals