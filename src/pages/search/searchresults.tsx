import React from 'react'
import CardContainer from "~/components/cards/CardContainer"
import type {
  NextPage,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ErrorPage from "next/error";
import { api } from "~/utils/api";
import { ssgHelper } from "~/server/api/ssgHelper";
import {RiArrowDownSLine} from 'react-icons/ri'
import {SlArrowRight} from 'react-icons/sl'
import ResultsContainer from "~/components/ResultsContainer";
import { LoadingPage } from "~/components/Loading";
import PageSearch from "~/components/search-bars/PageSearch";
import dayjs from "dayjs";

type results = {
  selectedDestination: string|null,
  selectedBudget:string|null,
  selectedType:string|null,
  selectedDeparture:string|null,
  selectedReturn:string|null

}

const Results:NextPage<results> = () => {

const search = useSearchParams()
  
const selectedDestination = search ? search.get('selectedDestination') : null
const selectedBudget = search ? search.get('selectedBudget') : null
const selectedType = search ? search.get('selectedType') : null
const selectedDeparture = search ? search.get('selectedDeparture') : null
const selectedReturn = search ? search.get('selectedReturn') : null


const dateChange = selectedDeparture ?  dayjs(selectedDeparture, 'DD/MM/YYYY').format('YYYY-MM-DD') : null;

const departDate = (dateChange !== null) ? dayjs(dateChange).toDate() : null

const returnChange = selectedReturn ? dayjs(selectedReturn, 'DD/MM/YYYY').format('YYYY-MM-DD') : null;

const returnDate = (returnChange !== null) ? dayjs(returnChange).toDate() : null



 const { data: result, isLoading } =  api.results.getByValue.useQuery({selectedDestination, selectedBudget, selectedType, departDate, returnDate});

 if (isLoading) return <LoadingPage/>;

 if (!result) {
      return <ErrorPage statusCode={404} />;;
    }

  return (
    <div>
        <div className="bg-amalfi z-0 flex flex-col items-center justify-center bg-cover bg-center shadow-lg h-full w-full sm:h-1/2">
        <div className="text-3xl sm:text-6xl font-bold text-white pt-4 sm:pt-10 font-nunito">Results</div>
        </div>
        <ResultsContainer info={result}/>
    </div>
  )
}

/*
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};


export async function getStaticProps(
  context: GetStaticPropsContext<{selectedDestination, selectedBudget, selectedType, selectedDeparture, selectedReturn}>
  ) {
    const { params } = context;

    if (!params) {
      return { notFound: true };
    }

    const { selectedDestination, selectedBudget, selectedType, selectedDeparture, selectedReturn } = params;

    console.log('selectedDestination:', selectedDestination);

  const ssg = ssgHelper();
  await ssg.results.getByValue.prefetch({selectedDestination, selectedBudget, selectedType, selectedDeparture, selectedReturn});
  
    return {
        props: { 
          trpcState: ssg.dehydrate(),
          selectedDestination, selectedBudget, selectedType, selectedDeparture, selectedReturn
         }
      };
  }

*/



export default Results