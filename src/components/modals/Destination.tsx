import React, { SyntheticEvent } from 'react'
import {SlArrowUp} from 'react-icons/sl'
import { useState, useEffect, useRef } from "react";
import useOnClickOutside from "~/hooks/closeModal";
import type {
  NextPage,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";
import Link from "next/link";
import ErrorPage from "next/error";
import { api } from "~/utils/api";
import { ssgHelper } from "~/server/api/ssgHelper";


type destinationProps = {
  closeDestinationModal: () => void
}

const Destination: React.FC<destinationProps> = ({closeDestinationModal}) => {

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const pops = ['Cape Town', 'Dubai', 'Turkey', 'Mauritius', 'Phuket'];


  const handleSearch = async () => {
    if (searchValue.length >= 3) {
      const { data: places } = api.places.getValue.useQuery({searchValue});

      if (!places) {return}

      const results = places.cities.concat(places.situated).flat();
      
      const matching = results.filter(match => match.includes(searchValue))

     console.log(matching)
  
    } else {
      setSearchResults([]);
    }
  };


  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  useOnClickOutside(ref, () => closeDestinationModal());

  const handleResults = () => {
    if (searchResults.length === 0 && searchValue.length >= 3) {
      return <div className="px-3 py-3 hover:bg-gray-100 ">
        We do not have destinations matching your search query.
      </div>
      }
    else if (searchResults.length > 0 ) {
      return searchResults.map((result) => 
      <div className="px-3 pb-1 hover:bg-gray-100 ">
        {result}
      </div>)
    }
    return pops.map((item) =>
    <div className="px-3 pb-1 hover:bg-gray-100 ">
     {item}
   </div>)
   }
  
  return (
  <>
  <div className="modal-content absolute z-50 w-full flex items-center justify-center  max-h-full translate-y-4 lg:translate-y-24 lg:justify-start lg:translate-x-10 2xl:translate-x-28">
    <div ref={ref} className="relative w-4/5 lg:w-2/5 max-h-full bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center py-4 border-b">
       <input placeholder="Where to?" type="text"  className="rounded-md h-10 sm:h-14 w-full sm:w-3/4 lg:w-5/8 2xl:w-3/5 mx-3 p-2 sm:w-120 border border-gray-400 placeholder-text-slate-400 cursor-text" value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}/>
      </div>
      <div className="sm:pl-2">
        <h3 className="text-sm text-gray-500 px-3 py-2">{(searchResults.length === 0 && searchValue.length < 3 ) ? "Popular" : 'Search Results..'}</h3>
       {handleResults()}
      </div>
    </div>
  </div>
</>
  )
}

export default Destination
