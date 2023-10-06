import React from 'react'
import PageSearch from "~/components/search-bars/PageSearch";
import CardContainer from "~/components/cards/CardContainer"
import type {
  NextPage,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";
import Link from "next/link";
import ErrorPage from "next/error";
import { api } from "~/utils/api";
import { ssgHelper } from "~/server/api/ssgHelper";
import {RiArrowDownSLine} from 'react-icons/ri'
import {SlArrowRight} from 'react-icons/sl'
import ResultsContainer from "~/components/ResultsContainer";


const Cruises:NextPage = () => {

  const { data: cruises } = api.cruises.getByValue.useQuery();

  if (!cruises) {
      return <ErrorPage statusCode={404} />;;
    }


  return (
    <div>
        <div className="bg-amalfi z-0 flex flex-col items-center justify-center bg-cover bg-center shadow-lg h-full w-full sm:h-1/2">
        <div className="text-3xl sm:text-6xl font-bold text-white pt-4 sm:pt-10 font-nunito">Cruises</div>
        <PageSearch category="Destination" category2="Budget" landing={false}/>
        </div>
        <ResultsContainer info={cruises}/>
    </div>
  )
}


export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
  ) {
   
  const ssg = ssgHelper();
  await ssg.cruises.getByValue.prefetch();
  
    return {
        props: { 
          trpcState: ssg.dehydrate(),
         },
      };
  }


export default Cruises