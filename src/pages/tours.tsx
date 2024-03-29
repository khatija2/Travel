import React from 'react'
import PageSearch from "~/components/search-bars/PageSearch";
import type {
  NextPage
} from "next";
import ErrorPage from "next/error";
import { api } from "~/utils/api";
import { ssgHelper } from "~/server/api/ssgHelper";
import ResultsContainer from "~/components/ResultsContainer";
import { LoadingPage } from "~/components/Loading";
import Head from "next/head";


const Tours:NextPage = () => {

  const { data: tours, isLoading } = api.tours.getByValue.useQuery();

  if (isLoading) return <LoadingPage/>;

  if (!tours) {
      return <ErrorPage statusCode={404} />;
    }

  return (
  <>
    <Head>
     <title>Tour Packages</title>
     <meta name="description" content="List of the tour packages we offer."/>
    </Head>
    <div>
        <div className="bg-gradient-to-b from-sky-600 to-sky-900  z-0 flex flex-col items-center justify-center bg-cover bg-center shadow-lg h-full w-full sm:h-1/2">
        <div className="text-3xl sm:text-6xl font-bold text-white pt-4 sm:pt-10 font-nunito">Tours</div>
        <PageSearch/>
        </div>
        <ResultsContainer info={tours}/>
    </div>
    </>
  )
}


export async function getStaticProps() {
   
  const ssg = ssgHelper();
  await ssg.tours.getByValue.prefetch();
  
    return {
        props: { 
          trpcState: ssg.dehydrate(),
         },
      };
  }




export default Tours