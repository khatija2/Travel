import React from 'react'
import { useState } from "react"
import Calendar from "~/components/modals/Calendar"
import {RiArrowDownSLine} from 'react-icons/ri'
import useOnClickOutside from "~/hooks/closeModal"

const Contact = () => {

    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [selectedReturn, setSelectedReturn] = useState<string | null>(null);
    const [selectedLeg, setSelectedLeg] = useState<string>("depart");
    const [selectedRound, setSelectedRound] = useState<string>("return");
    const [selectedDeparture, setSelectedDeparture] = useState<string | null>(null);
    const [showTypeModal, setShowTypeModal] = useState(false);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const types = ['Holiday Packages', 'Flights', 'Cruises', 'Tours', 'Resorts', 'Business']
  
    const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    useOnClickOutside(ref, () => closeTypeModal());
  

     const handleCalendarModal = () => {
    setShowCalendarModal(true)
  }

  const closeCalendarModal = () => {
    setShowCalendarModal(false)
  }


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

  
  const handleTypeModal = () => {
    setShowTypeModal(true)
  }

  const closeTypeModal = () => {
    setShowTypeModal(false)
  }

  const handleItemClick = (item: string) => {
    setSelectedType(item);
    closeTypeModal()
  };


  return (
<>

<div className="flex flex-col bg-sky-100 p-8 sm:p-16 lg:p-20">
    <div className="font-bold text-2xl md:text-3xl lg:text-4xl pb-6 sm:pb-10 text-sky-900">Contact Us</div>
    <div className="font-md whitespace-pre-wrap mb-6">
    Simply complete the form below with your request and we will get back to you shortly.  
    </div>
    <div className="font-md whitespace-pre-wrap mb-6">
    Alternatively, send us an email or give us a call:  
    </div>
    <div className="font-md mb-6 sm:mb-10">
        <ul className="pb-6">
            <li><strong>Telephone:</strong> +27 XX XXX XXXX</li>
            <li><strong>Email:</strong>  info@travel.co.za</li>
        </ul>
               
        <h1><strong>Office hours:</strong></h1>
        <table className="mt-2 ">
            <tbody>
                <tr>
                    <td>Mon-Fri:</td>
                    <td className="pl-4">8am-5pm</td>
                </tr>
                <tr>
                <td>Saturday:</td>
                <td className="pl-4">9am-2pm</td>
                </tr>
            </tbody>
        </table>
    </div>
<div className="font-md bg-white rounded-lg w-full sm:p-4 lg:p-6 2xl:p-10">
    <h1 className="font-bold my-4 md:my-6 md:mb-8 text-lg lg:text-2xl pl-2">Enquiry Form</h1>
    <div className="px-5 sm:p-0">
    {showCalendarModal && (
      <Calendar closeCalendarModal={closeCalendarModal} onDepartureSelected={handleDepartureSelected} onReturnSelected={handleReturnSelected} onLegSelected={handleLegSelected}  onRoundSelected={handleRoundSelected} selectedDeparture={selectedDeparture} selectedReturn={selectedReturn} selectedLeg={selectedLeg} selectedRound={selectedRound}/>
      )}
      </div>
    <form  >
    <div className="flex flex-col w-full justify-center items-center px-2 gap-4 sm:grid grid-cols-2">
        <div className="w-full">
            <label  className="flex mb-2 text-sm font-medium text-gray-900">Your name</label>
            <input type="text" className="border border-gray-300 text-gray-900 text-sm rounded-lg flex w-full p-2.5" placeholder="e.g. John Doe" required/>
        </div>
        <div className="w-full">
            <label  className="flex mb-2 text-sm font-medium text-gray-900">Phone number</label>
            <input type="tel" className="border border-gray-300 text-gray-900 text-sm rounded-lg flex w-full p-2.5" placeholder="000-000-0000" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"/>
        </div>
        <div className="w-full">
            <label className="flex mb-2 text-sm font-medium text-gray-900">Email address</label>
            <input type="email" className=" border border-gray-300 text-gray-900 text-sm rounded-lg flex w-full p-2.5" placeholder="e.g. name@travel.com" required/>
        </div> 
        <div className="w-full">
            <label className="flex mb-2 text-sm font-medium text-gray-900">Destination</label>
            <input className=" border border-gray-300 text-gray-900 text-sm rounded-lg flex w-full p-2.5" placeholder="Anywhere?"/>
        </div> 
        <div className="w-full">
            <label className="flex mb-2 text-sm font-medium text-gray-900">Travel Dates</label>
            <div className="border border-gray-300 text-sm rounded-lg flex justify-between text-gray-900 items-center w-full p-2.5" onClick={() => handleCalendarModal()}>
                <div>{(selectedDeparture !== null && selectedReturn === null) ? selectedDeparture : (selectedDeparture !== null && selectedReturn !== null) ? `${selectedDeparture} - ${selectedReturn}` : "Anytime"}</div>
                <span className="sr-only">Click to open calendar</span>
       
            </div>
        </div> 
        <div className="w-full">
        <label className="flex mb-2 text-sm font-medium text-gray-900">Travel Category</label>
        <button  className="rounded-lg text-sm text-gray-900 px-4 py-2.5 flex justify-between items-center border border-gray-300 w-full" type="button" onClick={handleTypeModal}>{selectedType !== null ? selectedType : "Any Category"}<RiArrowDownSLine size={18}/></button>
        <span className="sr-only">Dropdown menu</span>
        <div className="z-10 w-full relative">
            <div className={showTypeModal === false ? "hidden" : "bg-white rounded-lg shadow absolute w-full text-gray-900"} ref={ref}>
            {types.map((item, index) => ( 
        <div className="px-3 pb-1 hover:bg-gray-100 cursor-pointer" key={index} onClick={() => handleItemClick(item)}>
           {item}
        </div>
        ))}
            </div>
        </div>
        </div>
            <div className="w-full">
            <label className="flex mb-2 text-sm font-medium text-gray-900">Other information</label>
            <textarea className="border border-gray-300 text-gray-900 text-sm rounded-lg flex w-full h-40 p-2.5" placeholder="Type your requests here..."/>
            </div> 
        <div className="flex items-center justify-center mb-4 sm:mb-0">
             <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm sm:text-lg w-full sm:w-1/3 px-5 py-2.5 text-center">Submit</button>
        </div>
    </div> 
    </form>
</div>  
</div>
</>
  )
}

export default Contact