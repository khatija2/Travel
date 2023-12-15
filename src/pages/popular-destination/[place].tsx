import React from 'react'
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
import PageSearch from "~/components/search-bars/PageSearch";
import ResultsContainer from "~/components/ResultsContainer";
import { LoadingPage } from "~/components/Loading";



const popularDestination: NextPage<{place: string}> = ({place}) => {

  const { data: popular, isLoading } = api.popular.getByValue.useQuery({place});

  if (isLoading) return <LoadingPage/>;

  if (popular?.length === 0) {
      return <ErrorPage statusCode={404} />;
    }


  return (
    <div>
        <div className="bg-amalfi z-0 flex flex-col items-center justify-center bg-cover bg-center shadow-lg h-full w-full sm:h-1/2 relative">
        <div className="text-3xl sm:text-6xl font-bold text-white py-4 sm:py-10 font-nunito z-10">Visit {place}</div>
        </div>
        <ResultsContainer info={(popular !== undefined) ? popular : []}/>
    </div>
  )
}


export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ place: string }>
  ) {
  
  const place = context.params?.place

  if (place == null) {throw new Error("This page could not be found")}

  const ssg = ssgHelper();
  await ssg.popular.getByValue.prefetch({ place });

    return {
        props: { 
          trpcState: ssg.dehydrate(),
          place },
      };
}





export default popularDestination