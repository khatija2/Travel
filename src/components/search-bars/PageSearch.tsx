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
  landing: boolean

}



const PageSearch: React.FC<searchTypes> = ({category, category2, landing }) => {

  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<string | null>(null);
  const [selectedLeg, setSelectedLeg] = useState<string>("depart");
  const [selectedRound, setSelectedRound] = useState<string>("return");
  const [selectedDeparture, setSelectedDeparture] = useState<string | null>(null);
  



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

  const handleDestinationSelected: (item: string) => void = (item) => {
    setSelectedDestination(item);
  };

  const handleDepartureSelected: (item: string | null) => void = (item) => {
    setSelectedDeparture(item);
  };

  const handleReturnSelected: (item: string | null) => void = (item) => {
    setSelectedReturn(item);
  };

  const handleLegSelected: (item: string) => void = (item) => {
    setSelectedLeg(item);
  };

  const handleRoundSelected: (item: string) => void = (item) => {
    setSelectedRound(item);
  };

  return (
    <>
    <div className={`flex flex-col sm:flex-row sm:items-center justify-center h-52 sm:h-40 mb-4 w-4/5 z-10 px-4 gap-2 ${(landing === true) ? "py-2 lg:py-8 bg-white rounded-xl  border border-gray-200 shadow" : " bg-transparent " }`}>
      <button onClick={() => handleDestinationModal()} type="button" className={`z-30 rounded-md h-10 sm:h-14 w-8/10 sm:w-120  sm:flex-1 border border-gray-400 p-4 ${(selectedDestination !== null) ? `text-black font-semibold` : `text-slate-400`} cursor-text flex items-center justify-start gap-1 lg:text-lg bg-white`}><MdOutlinePlace size={20}/>{(selectedDestination !== null) ? selectedDestination : category}</button>
      {showDestinationModal && (
      <Destination closeDestinationModal={closeDestinationModal} onDestinationSelected={handleDestinationSelected} landing={landing}/>
      )}
      <button onClick={(category2 === "Travel category") ? () => handleTypeModal() : () => handleBudgetModal()} type="button"  className={`z-30 rounded-md h-10 sm:h-14 w-8/10 sm:w-160  sm:flex-1 border border-gray-400  p-4 ${(selectedType || selectedBudget !== null) ? `text-black font-semibold` :  `text-slate-400` } cursor-auto flex items-center justify-between lg:text-lg bg-white`}><div className="flex items-center gap-1 ">{(category2 === "Travel category") ? <MdTravelExplore size={20}/> : ((category2 === "Budget") ? <FaMoneyCheckAlt size={20}/> : "" ) }<p>{(selectedType || selectedBudget !== null) ? selectedType || selectedBudget : category2}</p></div><RiArrowDownSLine size={22}/></button>
      {showTypeModal && ( <>{category2 === "Travel category" && (
      <Holiday_types closeTypeModal={closeTypeModal} onTypeSelected={handleTypeSelected} landing={landing} />
      )}</>)}
        {showBudgetModal && ( <>{category2 === "Budget" && (
      <Budget closeBudgetModal={closeBudgetModal} onBudgetSelected={handleBudgetSelected} />
      )}</>)}
      <button onClick={() => handleCalendarModal()} type="button"  className={`z-30 rounded-md h-10 sm:h-14 w-8/10 sm:w-120  sm:flex-1 border border-gray-400  p-4 ${(selectedDeparture !== null) ? `text-black font-semibold` : `text-slate-400`} cursor-auto flex items-center justify-start gap-1 lg:text-lg bg-white`}><RiCalendarTodoFill size={20}/>{(selectedDeparture !== null && selectedReturn === null) ? selectedDeparture : (selectedDeparture !== null && selectedReturn !== null) ? `${selectedDeparture} - ${selectedReturn}` : "Dates"}</button>
      {showCalendarModal && (
      <Calendar closeCalendarModal={closeCalendarModal} onDepartureSelected={handleDepartureSelected} onReturnSelected={handleReturnSelected} onLegSelected={handleLegSelected}  onRoundSelected={handleRoundSelected} selectedDeparture={selectedDeparture} selectedReturn={selectedReturn} selectedLeg={selectedLeg} selectedRound={selectedRound}/>
      )}
      <button type="button" className="bg-blue-700 hover:bg-blue-800 text-white self-center w-1/3 sm:w-24 z-30 rounded-md h-10 sm:h-14">Search</button>
      </div>
    </>
  )
}

export default PageSearch