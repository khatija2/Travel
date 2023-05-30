import React, {useState} from 'react'
import {RiArrowDownSLine} from 'react-icons/ri'
import {MdTravelExplore} from 'react-icons/md'
import useOnClickOutside from "~/hooks/closeModal"


type destinationProps = {
  closeTypeModal: () => void
  onTypeSelected: (item: string) => void;
}

const Holiday_types: React.FC<destinationProps> = ({closeTypeModal,onTypeSelected}) => {


  const types = ['Holiday Packages', 'Flights', 'Cruises', 'Tours', 'Resorts', 'Business']

  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  useOnClickOutside(ref, () => closeTypeModal());

  const handleItemClick = (item: string) => {
    onTypeSelected(item);
    closeTypeModal()
  };

  const handleClearFilter = (event: any) => {
    onTypeSelected('All')
    closeTypeModal()
  };



  return (
    <div className="absolute z-50 w-full items-center justify-center  max-h-full translate-y-4 lg:translate-y-24 flex">
      <div ref={ref} className="relative w-4/5 lg:w-2/5 bg-white rounded-lg shadow-lg">
        <div className={`flex items-center justify-center py-4 lg:pt-6 lg:pb-6 border-b`}>
          <div  className="flex flex-row justify-between no-wrap items-center rounded-md h-10 sm:h-14 w-full sm:w-3/4 lg:w-5/8 2xl:w-3/5 mx-3  sm:w-120 border border-black p-2 sm:p-4">
            <div className="flex items-center gap-1 "><MdTravelExplore size={20}/><p>Travel Category</p></div>
            <span className="sr-only">Select a travel category</span>
            <span><RiArrowDownSLine size={20}/></span>
            </div>
          </div>
       <div className="sm:pl-2 pb-2">
        <h3 className=" text-gray-500 dark:text-white hover:bg-gray-100 px-3 py-2" onClick={handleClearFilter}>All</h3>
       {types.map((item, index) => ( 
        <div className="px-3 pb-1 hover:bg-gray-100 cursor-pointer" key={index} onClick={() => handleItemClick(item)}>
           {item}
        </div>
        ))}
       </div>
      </div>
    </div>
  )
}

export default Holiday_types