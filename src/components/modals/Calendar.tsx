import React, { useState } from 'react'
import {SlArrowRight} from 'react-icons/sl'
import {SlArrowLeft} from 'react-icons/sl'
import {RiCloseFill} from 'react-icons/ri'
import useOnClickOutside from "~/hooks/closeModal"
import { generateDate } from "~/hooks/generateDate"
import dayjs from 'dayjs';
import toast from "react-hot-toast"
import customParseFormat from 'dayjs/plugin/customParseFormat'



type CalendarProps = {
    closeCalendarModal: () => void;
    onDepartureSelected: (item: string | null) => void;
	onReturnSelected: (item: string | null) => void;
	onLegSelected: (item: string) => void;
	onRoundSelected: (item: string) => void;
	selectedDeparture: string | null;
	selectedReturn: string | null;
	selectedLeg: string
	selectedRound: string
  }



const Calendar: React.FC<CalendarProps> = ({closeCalendarModal, onDepartureSelected, onReturnSelected, onLegSelected, onRoundSelected, selectedDeparture, selectedReturn, selectedLeg, selectedRound}) => {
  

 const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]  
 const days = ["S", "M", "T", "W", "T", "F", "S"]; 
 const currentDate = dayjs();
 const [today, setToday] = useState(currentDate);
 const [selectDate, setSelectDate] = useState(currentDate);
 const [selectReturn, setSelectReturn] = useState(currentDate);
 const [leg, setLeg] = useState("depart");
 const [round, setRound] = useState("return")
 const [hoveredDate, setHoveredDate] = useState<dayjs.Dayjs | string | null>(null);
 const [departDate, setDepartDate] = useState<string | null>(null);
 const [returnDate, setReturnDate] = useState<string | null>(null);
 const [chosenDate, setChosenDate] = useState(selectedDeparture)
 const [chosenReturnDate, setChosenReturnDate] = useState(selectedReturn)
 const [chosenLeg, setChosenLeg] = useState(selectedLeg)
 const [chosenRound, setChosenRound] = useState(selectedRound)


dayjs.extend(customParseFormat);

const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

useOnClickOutside(ref, () => closeCalendarModal());

const handleDates = (date: dayjs.Dayjs) => {
	if (leg === "depart" && date.isAfter(currentDate)) {
	setSelectDate(date)
	setDepartDate(date.format('DD/MM/YYYY'))
	setChosenDate(null)
	setChosenReturnDate(null)
	if (round === "return") {
	setLeg("return")
	setChosenLeg("return")
	 }}
	else if ( round === "return" && leg === "return" && date > selectDate) {
	setSelectReturn(date)
	setReturnDate(date.format('DD/MM/YYYY'))}
}



const handleClear = () => {
	setSelectDate(currentDate)
	setSelectReturn(currentDate)
	setLeg("depart")
	setDepartDate(null)
	setReturnDate(null)
	setHoveredDate(null)
	setChosenDate(null)
	setChosenReturnDate(null)
	setChosenLeg("depart")	
	setChosenRound("return")
	onDepartureSelected(null)
    onReturnSelected(null)	
}

const handleDateMouseEnter = (date: dayjs.Dayjs) => {
    if (leg === "return" && date.isAfter(selectDate)) {
      setHoveredDate(date);
    }

  };

  const handleDateMouseLeave = () => {
	setHoveredDate(null)}
  
  

  const isHovered = (date: dayjs.Dayjs) => {
    if (leg === "return" && hoveredDate !== null)  {
      if( date.isAfter(selectDate) && (date.isSame(hoveredDate) || date.isBefore(hoveredDate)) ) {
		return true
	  }
    }
    return false;
  };



const isInRange = (date: dayjs.Dayjs) => {
    if (leg === "return"  && selectReturn !== currentDate )  {
      if(date.isAfter(selectDate) && date.isBefore(selectReturn) ) {
		return true
	  }
    }
    return false;
  };


  const chosenRange = (date: dayjs.Dayjs) => {
	if (chosenDate !== null && chosenReturnDate !== null) {
	if(date.isAfter(dayjs(chosenDate, 'DD/MM/YYYY')) && date.isBefore(dayjs(chosenReturnDate, 'DD/MM/YYYY'))) {
	return true
	 }
	}
	return false;
  }

const chooseSingle = () => {
	setRound("single")
	setChosenLeg("depart")
	setChosenRound("single")
	handleClear()
	setReturnDate(null)
}

const chooseReturn = () => {
	setRound("return")
	setChosenRound("return")
	handleClear()
}


const handleDoneClick = () => {
	if (round === "single" && departDate === null) {
		toast.error("Please select a departure date")
	}
	if (round === "return" &&  departDate === null && chosenDate === null) {
		toast.error("Please select a departure date")
	}
	if (round === "return" && departDate!== null && returnDate === null) {
		toast.error("Please select a return date")
	}
	if (round === "return") {
		onRoundSelected("return")
	}
	if (round === "single") {
		onRoundSelected("single")
		
	}	
	if (chosenRound === "return" && chosenReturnDate !== null){
		closeCalendarModal()
	}
	if ( chosenRound === "single" && chosenDate !== null){
		onRoundSelected("single")
		closeCalendarModal()
	}
	if (round === "return" && returnDate !== null) {
	onDepartureSelected(departDate)
	onReturnSelected(returnDate);
	onLegSelected("depart")
    closeCalendarModal()	
	}
	if (round === "single"  && departDate !== null ) {
	onDepartureSelected(departDate)
	onReturnSelected(returnDate);
	onLegSelected("depart")
	closeCalendarModal()
	}
  };

  return (
    <div className="absolute z-50 top-50 lg:w-4/5 -translate-x-6 sm:translate-x-0 translate-y-24 sm:translate-y-44 flex justify-center">
        <div ref={ref} className="flex flex-col items-center justify-center w-full sm:w-9/10 p-1 rounded-lg shadow-2xl border border-gray-200 bg-white 2xl:w-1/2">
            <div className="flex items-center justify-start w-full">
                <button type="button"  aria-label="close modal" onClick={closeCalendarModal} className="hover:bg-gray-200 rounded-full hover:text-white text-slate-700 text-xl sm:text-2xl lg:text-3xl sm:p-1">
                <RiCloseFill/>
                </button>
            </div>
        <div className="flex items-center justify-between pt-2  w-full pr-4 sm:pr-6">
            <div>
                <div className="p-1 text-xs sm:text-base ml-1 lg:pl-24 flex-wrap">{leg === "depart" || chosenLeg === "depart" ? "Earliest Departure ..." : "Latest Return ..." }</div>
               
            </div>
            <div className="bg-gray-200 rounded-full p-0.5 sm:p-1 sm:text-sm my-1 sm:my-2  ">
                <button className={` ${round !== "return" || chosenRound === "single"  ? "bg-white" : "bg-transparent text-gray-400" }  text-xs rounded-full px-1.5 sm:px-2 py-1 sm:py-1.5`} onClick={() => chooseSingle() } >One Way</button>
                <button className={`${round !== "single" && chosenRound === "return" ? "bg-white" : "bg-transparent text-gray-400" } rounded-full text-xs px-1.5 sm:px-2 py-1 sm:py-1.5`} onClick={() => chooseReturn() }>Return</button>
            </div>
        </div>
        <div className="flex flex-row justify-center items-center relative">

                <div className="pt-6 pb-2">          
                <div className="flex gap-1 sm:divide-x justify-center h-full px-3 items-center sm:flex-row flex-col">
			<div className="w-70 h-70 lg:w-96">
				<div className="flex justify-between items-center px-2 flex-row">
					<div className="select-none font-semibold flex flex-row gap-1.5">
						<span>{months[today.month()]}</span><span>{today.year()}</span>
					</div>
					<div className="flex gap-2 items-center">
						<SlArrowLeft
							className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:scale-105 transition-all"
							onClick={() => {
								setToday(today.month(today.month() - 1));
							}}
						/>
						<h1
							className=" cursor-pointer hover:scale-105 transition-all"
							onClick={() => {
								setToday(currentDate);
							}}
						>
                            </h1>
						<SlArrowRight
							className="w-4 h-4 cursor-pointer hover:scale-105 transition-all sm:hidden"
							onClick={() => {
								setToday(today.month(today.month() + 1))
							}}
						/>
					</div>
				</div>
				<div className="grid grid-cols-7 ">
					{days.map((day, index) => {
						return (
							<h1
								key={index}
								className="text-sm text-center h-12 w-12 sm:h-10 sm:w-10 grid place-content-center text-gray-500 select-none"
							>
								{day}
							</h1>
						);
					})}
				</div>

				<div className=" grid grid-cols-7 ">
					{generateDate(today.month(), today.year()).map(
						({ date, currentMonth}, index) => {
							return (
								<div
									key={index}
									className="p-2 sm:p-1.5 text-center h-12 sm:h-10 grid place-content-center text-sm"
								>
									<h1
										className={`
											${currentMonth ? "" : "text-gray-400"}
											${(date
												.toDate()
												.toDateString() === currentDate.toDate()
												.toDateString()) ? "text-gray-500" :
												(selectDate.toDate().toDateString() === date.toDate().toDateString() || selectReturn.toDate().toDateString() === date.toDate().toDateString() ? (currentMonth ? 'bg-sky-800 text-white' : 'bg-white' )
												: "" )	
												}
												${(chosenDate === date.format('DD/MM/YYYY')) ? (currentMonth ? 'bg-sky-800 text-white' : 'bg-white' ) : "" }
												${(chosenReturnDate === date.format('DD/MM/YYYY')) ? (currentMonth ? 'bg-sky-800 text-white' : 'bg-white' ) : "" }
												${isHovered(date) ? (currentMonth ? 'bg-sky-300' : 'bg-white') : ''}
												${isInRange(date) ? (currentMonth ? 'bg-sky-300' : 'bg-white') : ''}
												${chosenRange(date) ? (currentMonth ? 'bg-sky-300' : 'bg-white') : ''}
												${leg === "depart" ? (currentMonth ? 'hover:bg-sky-300' : 'bg-white') : ''}
											h-10 w-10 sm:h-8 sm:w-8  grid place-content-center transition-all cursor-pointer select-none
										`}
										onClick={() => 
											handleDates(date)
										}
										onMouseEnter={() =>  handleDateMouseEnter(date)}
										onMouseLeave={handleDateMouseLeave}
											

										
									>
										{date.date()}
									</h1>
								</div>
							);
						}
					)}
				</div>
		
			
		</div>
                </div>
                
            </div>


            <div className="hidden sm:flex">
    
                <div className="pt-6 pb-2">          
                <div className="flex gap-1 sm:divide-x justify-center px-3 h-full items-center sm:flex-row flex-col">
			<div className="w-70 h-70 lg:w-96">
				<div className="flex justify-between items-center px-2 flex-row ">
					<div className="select-none font-semibold flex flex-row gap-1.5">
						<span>{months[today.month() === 11 ? 0 : today.month() + 1]}</span><span>{today.month() === 11 ? today.year() + 1 : today.year()}</span>
					</div>
					<div className="flex gap-2 items-center">
						<h1
							className="cursor-pointer hover:scale-105 transition-all"
							onClick={() => {
								setToday(currentDate);
							}}
						>
                            </h1>
						<SlArrowRight
							className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:scale-105 transition-all"
							onClick={() => {
								setToday(today.month(today.month() + 1));
							}}
						/>
					</div>
				</div>
				<div className="grid grid-cols-7 ">
					{days.map((day, index) => {
						return (
							<h1
								key={index}
								className="text-sm text-center h-12 w-12 sm:h-10 sm:w-10 grid place-content-center text-gray-500 select-none"
							>
								{day}
							</h1>
						);
					})}
				</div>

				<div className=" grid grid-cols-7 ">
					{generateDate(today.month() + 1, today.year()).map(
						({ date, currentMonth}, index) => {
							return (
								<div
									key={index}
									className="p-2 text-center h-12 sm:h-10 sm:p-1.5 grid place-content-center text-sm"
								>
									<h1
										className={`
											${currentMonth ? "" : "text-gray-400"}
											${(date
												.toDate()
												.toDateString() === currentDate.toDate()
												.toDateString()) ? "text-gray-500" :
												(selectDate.toDate().toDateString() === date.toDate().toDateString() || selectReturn.toDate().toDateString() === date.toDate().toDateString() ? (currentMonth ? "bg-sky-800 text-white" : "bg-white")
												: "" )	}
												${(chosenDate === date.format('DD/MM/YYYY')) ? (currentMonth ? 'bg-sky-800 text-white' : 'bg-white' ) : "" }
												${(chosenReturnDate === date.format('DD/MM/YYYY')) ? (currentMonth ? 'bg-sky-800 text-white' : 'bg-white' ) : "" }
												${isHovered(date) ? (currentMonth ? 'bg-sky-300' : 'bg-white') : ''}
												${isInRange(date) ? (currentMonth ? 'bg-sky-300' : 'bg-white') : ''}
												${chosenRange(date) ? (currentMonth ? 'bg-sky-300' : 'bg-white') : ''}
												${leg === "depart" ? (currentMonth ? 'hover:bg-sky-300' : 'bg-white') : ''}
											h-10 w-10 sm:h-8 sm:w-8 grid place-content-center transition-all cursor-pointer select-none
										`}
										onClick={() => {
											handleDates(date)
										}}
										onMouseEnter={() => handleDateMouseEnter(date)}
										onMouseLeave={handleDateMouseLeave}
									>
										{date.date()}
									</h1>
								</div>
							);
						}
					)}
				</div>
			</div>
			
		</div>
                </div>
                
        
                
            </div>

            </div>
        <div className="flex items-end justify-end w-full p-3 sm:pb-4 sm:pr-6">
            <div className="underline mr-8 hover:text-blue-700 cursor-pointer" onClick={() => handleClear()}>Clear</div>
       <button type="button"  aria-label="Submit selected dates" className="hover:bg-blue-900 rounded-lg text-white text-sm bg-blue-700 py-2 px-3" onClick={() => handleDoneClick()}>
        Done
     </button>
     </div>
        </div>

    </div>
  )
}

export default Calendar