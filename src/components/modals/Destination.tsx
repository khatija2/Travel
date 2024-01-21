'use client'
import React, { useState, useEffect } from 'react'
import useOnClickOutside from "~/hooks/closeModal";
import type { NextPage} from "next";
import { api } from "~/utils/api";
import { LoadingPage } from "../Loading";


type destinationProps = {
  closeDestinationModal: () => void
  onDestinationSelected: (item: string) => void;
  landing: string
}


const Destination: NextPage<destinationProps> = ({closeDestinationModal, onDestinationSelected, landing}) => {

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const pops = ['Cape Town', 'Dubai', 'Turkey', 'Mauritius', 'Phuket'];

  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  useOnClickOutside(ref, () => closeDestinationModal());


useEffect(() => {
  if(searchValue.length >= 2){
handleSearch()
}
}, [searchValue])



 const { data: results, isLoading } =  api.places.getValue.useQuery({searchValue}, {enabled: searchValue.length >= 2});

 
  const handleSearch = () => {

    if (isLoading) return <LoadingPage/>;
    
       if (results) {
        setSearchResults(results)
       }
     
  };

 
  const handleSearchChange =  (e: any) => {
    setSearchValue(e.target.value);
    if (e.target.value.length >= 2) {
       handleSearch();
    } 
  };


  const handleResults = () => {
  
    if (searchResults.length > 0 ) {
      return searchResults.map((result) => 
      <div className="hover:bg-gray-100 px-3 py-1.5 cursor-pointer" key={result} onClick={() => handleItemClick(result)}>
        {result}
      </div>)
    }
    else if (searchResults.length === 0 && searchValue.length > 3) {
      return <div className=" hover:bg-gray-100 px-3 py-1.5  ">
        We do not have destinations matching your search query.
      </div>
      }
      else {
        return pops.map((item, index) =>
        <div className=" hover:bg-gray-100 px-3 py-1.5 cursor-pointer " key={index} onClick={() => handleItemClick(item)}>
         {item}
       </div>)
      }
 
    }
   
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        setSearchResults([]);
      }
    };


   const handleItemClick = (item: string) => {
    onDestinationSelected(item);
    closeDestinationModal()
  };


  return (

  <>
  <div>
  <div className={`absolute z-50 w-3/4 sm:left-20 sm:translate-y-24 2xl:translate-x-24 ${(landing === "landing") ? "top-32 -translate-y-9.5 left-12 sm::left-38 sm:top-16" : "left-30 -translate-x-1.5 top-40 translate-y-4 "}`}>
    <div ref={ref} className="relative w-full sm:w-3/4 lg:w-2/5 bg-white rounded-lg shadow-lg ">
      <div className="flex items-center justify-center py-4 border-b">
       <input placeholder="All Destinations" type="search"  className="rounded-md h-10 sm:h-14 w-full sm:w-3/4 lg:w-5/8 2xl:w-3/5 mx-3 p-2 sm:w-120 border border-black placeholder-text-slate-400 cursor-text" value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        />
      </div>
      <div className="sm:pl-2">
        <div className="text-sm text-gray-500 px-3 py-1.5">Popular</div>
        {handleResults()}
      </div>
    </div>
  </div>
  </div>
</>
  )
}

export default Destination
