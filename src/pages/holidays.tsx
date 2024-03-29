import React from 'react'
import type {
  NextPage
} from "next";
import ErrorPage from "next/error";
import { api } from "~/utils/api";
import { ssgHelper } from "~/server/api/ssgHelper";
import PageSearch from "~/components/search-bars/PageSearch";
import ResultsContainer from "~/components/ResultsContainer";
import { LoadingPage } from "~/components/Loading";
import Head from "next/head";


const Holidays: NextPage = () => {

  const { data: holidays, isLoading } = api.holidays.getByValue.useQuery();

  if (isLoading) return <LoadingPage/>;

  if (!holidays) {
      return <ErrorPage statusCode={404} />;
    }

  return (
    <>
     <Head>
     <title>Holiday Packages</title>
     <meta name="description" content="List of the holiday packages we offer."/>
    </Head>
    <div>
        <div className="bg-gradient-to-b from-sky-600 to-sky-900 z-0 flex flex-col items-center justify-center bg-cover bg-center shadow-lg h-full w-full sm:h-1/2">
        <div className="text-3xl sm:text-6xl font-bold text-white pt-4 sm:pt-10 font-nunito">Holidays</div>
        <PageSearch/>
        </div>
        <ResultsContainer info={holidays}/>
    </div>
    </>
  )
}


export async function getStaticProps() {
   
  const ssg = ssgHelper();
  await ssg.holidays.getByValue.prefetch();
  
    return {
        props: { 
          trpcState: ssg.dehydrate(),
         },
      };
  }


export default Holidays