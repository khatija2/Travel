import React from 'react'
import {GrLocationPin} from 'react-icons/gr'
import {IoMdStar} from 'react-icons/io'
import {MdNightlight} from 'react-icons/md'
import type {NextPage} from "next";
import { LoadingPage } from "../Loading";
import { api } from "~/utils/api";

const Itinerary: NextPage<{ profileId: string}> = ({profileId}) => {

    const { data: itinerary, isLoading } = api.itinerary.getbyProfileId.useQuery({ profileId });

    if (isLoading) return <LoadingPage/>;

    if (!itinerary) {
        return <div></div>;;
      }


  return (
    <div className="bg-white my-4 sm:my-6 2xl:my-10 border">
            <div className="flex text-xl sm:text-3xl font-bold justify-center pt-3 2xl:pt-8 sm:py-4"><h1>Itinerary</h1></div>
            <div className="m-2 sm:m-4 2xl:m-8 border-b-2 border-gray-300 mb-4">
                <div className="grid sm:grid-cols-2 gap-2 mb-2 2xl:mb-4" key={itinerary.id}>
             
                   
                    {itinerary?.stays.map((stay) =>
                       <div> 
                         <h1 className="font-bold sm:text-lg">{stay.hotel.name}</h1>
                    <ul className="list-inside leading-relaxed">
                        <li><div className="flex flex-row items-center gap-1"><MdNightlight/>{stay.nights}</div></li>
                        <li><div className="flex flex-row items-center gap-1"><IoMdStar/>{stay.hotel.stars}</div></li>
                        <li><div className="flex flex-row items-center gap-1"><GrLocationPin/>{stay.hotel.location}</div></li>
                    </ul>
                  
                </div>
                  )}
                
                </div>
            </div>
            <div className="m-4 flex flex-col ">
            {itinerary?.daily.map((itin, index) =>
                <div className="flex flex-row w-full mb-4" key={index}>
                    <div className="w-1/6 font-bold sm:text-lg flex flex-wrap sm:flex-nowrap items-center pr-1 sm:pr-0 sm:pl-6 2xl:pl-10 ">
                     Day {index + 1 }
                    </div>
                    <div className="w-5/6 flex text-sm items-center">
                    {itin}
                    </div>
                </div>
            )}
            </div>
        </div>
  )
}


export default Itinerary