
'use client'
import React, { useState , useEffect} from 'react'
import useOnClickOutside from "~/hooks/closeModal";
import type { NextPage} from "next";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../Loading";
import { usePathname } from 'next/navigation';
import { useIsFetching } from '@tanstack/react-query'




type destinationProps = {
  closeDestinationModal: () => void
  onDestinationSelected: (item: string) => void;
}




const Destination: NextPage<destinationProps> = ({closeDestinationModal, onDestinationSelected}) => {

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);


  const pops = ['Cape Town', 'Sydney', 'Turkey', 'Ireland', 'Singapore'];

  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  useOnClickOutside(ref, () => closeDestinationModal());

 const path = usePathname()
  
 const utils = api.useContext()

 const isFetching = useIsFetching()


  const getresults = async () => {
    if (searchValue.length < 2) {setSearchResults([])}
    if (searchValue.length >= 2 ) {
       await utils.places.getValue.fetch({ searchValue })
        .then((res) => {
          setSearchResults(res);
          handleResults()
    })
      } 
    }
  

 
  const handleSearchChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (!isFetching) {
    getresults()}
  }

    
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!isFetching) {
        getresults()
      }
    }
  };


  const handleResults = () => {
    if (searchResults.length > 0 ) {
      return searchResults.map((result) => 
      <div className="hover:bg-gray-100 px-3 py-1.5 cursor-pointer normal-case" key={result} onClick={() => handleItemClick(result)}>
        {result}
      </div>)
    }
      else {
        return pops.map((item, index) =>
        <div className=" hover:bg-gray-100 px-3 py-1.5 cursor-pointer normal-case" key={index} onClick={() => handleItemClick(item)}>
         {item}
       </div>)
      }
 
    }


   const handleItemClick = (item: string) => {
    onDestinationSelected(item);
    closeDestinationModal()
  };

  const handleClearFilter = (event: any) => {
    onDestinationSelected("Any Destination")
    closeDestinationModal()
  };


  return (

  <>
  <div>
  <div className={`absolute z-50 w-3/4 sm:left-20 sm:translate-y-24 2xl:translate-x-24 ${(path === "/") ? "top-32 -translate-y-9.5 left-12 sm::left-38 sm:top-16" : "left-30 -translate-x-1.5 top-40 translate-y-4 "}`}>
    <div ref={ref} className="relative w-full sm:w-3/4 lg:w-2/5 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center py-4 border-b">
       <input placeholder="All Destinations" type="search"  className="rounded-md h-10 sm:h-14 w-full sm:w-3/4 lg:w-5/8 2xl:w-3/5 mx-3 p-2 sm:w-120 border border-black placeholder-text-slate-400 cursor-text"
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        />
      </div>
      <div className="sm:pl-2">
      <h3 className="text-gray-500 dark:text-white hover:bg-gray-100 px-3 py-3" onClick={handleClearFilter}>Any Destination</h3>
        {isFetching ? <div className="flex justify-center"><LoadingSpinner size={25}/></div> : "" }
        {handleResults()}
      </div>
    </div>
  </div>
  </div>
</>
  )
}

export default Destination
