import React, {useState, useEffect} from 'react'
import Link from "next/link";
import type {
  NextPage,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";
import ErrorPage from "next/error";
import { api } from "~/utils/api";
import { ssgHelper } from "~/server/api/ssgHelper";
import PageSearch from "~/components/search-bars/PageSearch"
import CardContainer from "~/components/cards/CardContainer"
import {RiArrowDownSLine} from 'react-icons/ri'
import {SlArrowRight} from 'react-icons/sl'
import {SlArrowLeft} from 'react-icons/sl'
import ButtonNext from "~/components/buttons/ButtonNext";
import ButtonPrev from "~/components/buttons/ButtonPrev";
import Sort from "~/components/search-bars/Sort";
import ResultsContainer from "~/components/ResultsContainer";




const Deals: NextPage = () => {

  const { data: deals } = api.deals.getAll.useQuery();

  if (!deals) {
      return <ErrorPage statusCode={404} />;;
    }

  const info: any = []
  for (let i =0; i < deals.length; i++) {
   const deal = deals[i]
   if (deal) {info.push(deal.profile)}
  }

 
  return (
    <div>
        <div className="bg-amalfi z-0 flex flex-col items-center justify-center bg-cover bg-center shadow-lg h-full w-full sm:h-1/2">
        <div className="text-3xl sm:text-6xl font-bold text-white pt-4 sm:pt-10 font-nunito">Deals</div>
        <PageSearch category="Destination" category2="Travel category"/>
        </div>
        <ResultsContainer info={info}/>
    </div>
  )
}



export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
  ) {
   
  const ssg = ssgHelper();
  await ssg.deals.getAll.prefetch();
  
    return {
        props: { 
          trpcState: ssg.dehydrate(),
         },
      };
  }



export default Deals