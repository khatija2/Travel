import React from 'react'
import { useCallback, useState } from "react"
import Link from 'next/link'
import Destination from "../modals/Destination"
import Holiday_types from "../modals/Holiday_types"
import Budget from "../modals/Budget"
import Calendar from "../modals/Calendar"
import {MdOutlinePlace} from 'react-icons/md'
import {MdTravelExplore} from 'react-icons/md'
import {RiCalendarTodoFill} from 'react-icons/ri'
import {RiArrowDownSLine} from 'react-icons/ri'
import {FaMoneyCheckAlt} from 'react-icons/fa'

type searchTypes = {
  category: string,
  category2: string,

}



const PageSearch: React.FC<searchTypes> = ({category, category2 }) => {

  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);



  const handleDestinationModal = () => {
    setShowDestinationModal(true);
  };

  const handleTypeModal = () => {
    setShowTypeModal(true)
  }

  const handleCalendarModal = () => {
    setShowCalendarModal(true)
  }

  const handleBudgetModal = () => {
    setShowBudgetModal(true)
  }

  const closeDestinationModal = () => {
    setShowDestinationModal(false)
  };

  const closeTypeModal = () => {
    setShowTypeModal(false)
  }

  const closeCalendarModal = () => {
    setShowCalendarModal(false)
  }

  const closeBudgetModal = () => {
    setShowBudgetModal(false)
  }

  const handleTypeSelected: (item: string) => void = (item) => {
    setSelectedType(item);
  };

  const handleBudgetSelected: (item: string) => void = (item) => {
    setSelectedBudget(item);
  };


  return (
    <>
    <div className="flex flex-col sm:flex-row sm:items-center justify-center h-52 sm:h-40 mb-4 w-4/5 z-10 bg-transparent px-4 gap-2">
      <button onClick={() => handleDestinationModal()} type="button" className="z-30 rounded-md h-10 sm:h-14 w-8/10 sm:w-120  sm:flex-1 border border-gray-400 p-4 text-slate-400 cursor-text flex items-center justify-start gap-1 lg:text-lg bg-white"><MdOutlinePlace size={20}/>{category}</button>
      {showDestinationModal && (
      <Destination closeDestinationModal={closeDestinationModal}/>
      )}
      <button onClick={(category2 === "Travel category") ? () => handleTypeModal() : () => handleBudgetModal()} type="button"  className={`z-30 rounded-md h-10 sm:h-14 w-8/10 sm:w-160  sm:flex-1 border border-gray-400  p-4 ${(selectedType || selectedBudget !== null) ? `text-black font-semibold` :  `text-slate-400` } cursor-auto flex items-center justify-between lg:text-lg bg-white`}><div className="flex items-center gap-1 ">{(category2 === "Travel category") ? <MdTravelExplore size={20}/> : ((category2 === "Budget") ? <FaMoneyCheckAlt size={20}/> : "" ) }<p>{(selectedType || selectedBudget !== null) ? selectedType || selectedBudget : category2}</p></div><RiArrowDownSLine size={22}/></button>
      {showTypeModal && ( <>{category2 === "Travel category" && (
      <Holiday_types closeTypeModal={closeTypeModal} onTypeSelected={handleTypeSelected}/>
      )}</>)}
        {showBudgetModal && ( <>{category2 === "Budget" && (
      <Budget closeBudgetModal={closeBudgetModal} onBudgetSelected={handleBudgetSelected} />
      )}</>)}
      <button onClick={() => handleCalendarModal()} type="button"  className="z-30 rounded-md h-10 sm:h-14 w-8/10 sm:w-120  sm:flex-1 border border-gray-400  p-4 text-slate-400 cursor-auto flex items-center justify-start gap-1 lg:text-lg bg-white"><RiCalendarTodoFill size={20}/>Dates</button>
      {showCalendarModal && (
      <Calendar closeCalendarModal={closeCalendarModal}/>
      )}
      <button type="button" className="bg-blue-700 hover:bg-blue-800 text-white self-center w-1/3 sm:w-24 z-30 rounded-md h-10 sm:h-14 border border-gray-400">Search</button>
    </div>
</>
  )
}

export default PageSearch