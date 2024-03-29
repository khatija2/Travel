'use client'
import React from 'react'
import type {
  NextPage,
} from "next";
import { useSearchParams } from "next/navigation";
import ErrorPage from "next/error";
import { api } from "~/utils/api";
import ResultsContainer from "~/components/ResultsContainer";
import { LoadingPage } from "~/components/Loading";
import dayjs from "dayjs";

type resultsProps = {
  selectedDestination: string|null,
  selectedBudget:string|null,
  selectedType:string|null,
  selectedDeparture:string|null,
  selectedReturn:string|null
  landing:string|null

}

const Results:NextPage<resultsProps> = () => {

const search = useSearchParams()
  
const selectedDestination = search ? search.get('selectedDestination') : null
const selectedBudget = search ? search.get('selectedBudget') : null
const selectedType = search ? search.get('selectedType') : null
const selectedDeparture = search ? search.get('selectedDeparture') : null
const selectedReturn = search ? search.get('selectedReturn') : null
const landing = search ? search.get('landing') : null


const dateChange = selectedDeparture ?  dayjs(selectedDeparture, 'DD/MM/YYYY').format('YYYY-MM-DD') : null

const departDate = (dateChange !== null) ? dayjs(dateChange).toDate() : null

const returnChange = selectedReturn ? dayjs(selectedReturn, 'DD/MM/YYYY').format('YYYY-MM-DD') : null

const returnDate = (returnChange !== null) ? dayjs(returnChange).toDate() : null

const page = landing === 'landing' ? null : landing

const budget = selectedBudget !== "None" ? selectedBudget : "null"

const destination = selectedDestination !== "Any Destination" ? selectedDestination : "null"


 const { data: result, isLoading } =  api.results.getByValue.useQuery({destination, budget, selectedType, departDate, returnDate, page});

 if (isLoading) return <LoadingPage/>;

 if (!result) {
      return <ErrorPage statusCode={404}/>;
    }


  return (
    <div>
        <div className="bg-gradient-to-b from-sky-600 to-sky-900 z-0 flex flex-col items-center justify-center bg-cover bg-center shadow-lg h-full w-full sm:h-1/2">
        <div className="text-3xl sm:text-6xl font-bold text-white pt-4 pb-2 sm:pt-6 font-nunito">Results</div>
        </div>
        <div className={result.length === 0 ? "text-lg sm:text-2xl text-center text-black p-4 sm:pt-10 font-inter" : "hidden"}>There are no results that meet your critera.  Perhaps try a wider search...</div>
        <ResultsContainer info={result}/>
    </div>
  )
}


export default Results