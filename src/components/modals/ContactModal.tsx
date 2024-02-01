'use client'
import React, {FormEvent} from 'react'
import {useState} from "react"
import Calendar from "~/components/modals/Calendar"
import {RiArrowDownSLine} from 'react-icons/ri'
import {RiCloseFill} from 'react-icons/ri'
import useOnClickOutside from "~/hooks/closeModal"
import toast from "react-hot-toast"

type ContactModalProps = {
    closeContactModal: () => void;
    title: string
}


const ContactModal: React.FC<ContactModalProps> = ({closeContactModal, title}) => {

    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [selectedReturn, setSelectedReturn] = useState<string | null>(null);
    const [selectedLeg, setSelectedLeg] = useState<string>("depart");
    const [selectedRound, setSelectedRound] = useState<string>("return");
    const [selectedDeparture, setSelectedDeparture] = useState<string | null>(null);
    const [showTypeModal, setShowTypeModal] = useState(false);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [validName, setValidName] = useState("")
    const [validEmail, setValidEmail] = useState("")
    
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [destination, setDestination] = useState("");
    const [other, setOther] = useState("");

    const types = ['Holiday Packages', 'Flights', 'Cruises', 'Tours', 'Resorts', 'Business']
  
    const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const ref2 = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    useOnClickOutside(ref, () => closeTypeModal()); 

    useOnClickOutside(ref2, () => closeContactModal()); 
  

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

  const handleValidName = (name:string) => {
    if (name !== "") {
      setValidName(name)
    } else {
      setValidName("invalid")
    }
  }

  const handleValidEmail = (email:string) => {
    if (email !== "") {
      setValidEmail(email)
    } else {
      setValidEmail("invalid")
    }
  }



const onSubmit = (e: FormEvent) => {
  e.preventDefault()
  handleValidName(name)
  handleValidEmail(email)
  if (name !== "" && email !== "") { 
   fetch('/api/contactForm', {
      method: 'POST',
      body: JSON.stringify({
        name, phone, email, destination, selectedDeparture, selectedReturn, selectedType, other, title
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => { if (res.status === 200) {
      setName("")
      setPhone("")
      setEmail("")
      setDestination("")
      setOther("")
      setSelectedDeparture(null)
      setSelectedReturn(null)
      setSelectedType(null)
      setValidName("")
      setValidEmail("")

      toast.success("Thank you for contacting us, your enquiry was sent successfully!", {duration: 8000})
     } else {
      throw new Error('Network response was not ok.');
     }
    })
    .catch(error => {
    console.log('Error:', error);
    toast.error("There was a problem sending your enquiry! Please try again or send us an email", {duration: 8000})
    })
  }
  else {toast.error("Please ensure that the required fields are completed!", {duration: 8000})}
 }



  return (
    <>
    <div ref={ref2} className="absolute z-40 top-50 sm:top-0 left-0 px-4 sm:px-10 lg:px-20 2xl:px-40 right-0 translate-y-24 sm:translate-y-44">
     <div className="flex flex-col justify-center self-center w-full p-1 rounded-lg shadow-2xl border border-gray-200 bg-white">
      <div className="flex flex-col justify-center bg-sky-100 p-6 w-full sm:p-4 lg:px-10 lg:py-6">
      <div className="flex items-center justify-end w-full">
       <button type="button"  aria-label="close modal" onClick={closeContactModal} className="hover:bg-gray-200 rounded-full hover:text-white text-slate-700 text-xl sm:text-2xl lg:text-3xl sm:p-1">
        <RiCloseFill/>
       </button>
      </div>
      <div className="font-bold text-2xl md:text-3xl lg:text-4xl pb-6 sm:pb-8 text-black text-center underline">Enquiry</div>   
       <div className="font-bold text-xl md:text-2xl lg:text-3xl pb-6 sm:pb-4 text-sky-900 text-center">{title}</div>   
       <div className="font-md bg-white rounded-lg w-full p-2 pt-4 sm:p-4 lg:p-6 2xl:p-10">
        <div className="px-4 sm:p-0 right-0 left-0">
        {showCalendarModal && (
        <Calendar closeCalendarModal={closeCalendarModal} onDepartureSelected={handleDepartureSelected} onReturnSelected={handleReturnSelected} onLegSelected={handleLegSelected}  onRoundSelected={handleRoundSelected} selectedDeparture={selectedDeparture} selectedReturn={selectedReturn} selectedLeg={selectedLeg} selectedRound={selectedRound}/>
        )}
        </div>
        <form onSubmit={onSubmit} >
    <div className="flex flex-col w-full justify-center items-center px-2 gap-4 sm:grid grid-cols-2">
        <div className="w-full">
            <label  className="flex mb-2 text-sm font-medium text-gray-900">Your name <span className="text-red-500 px-1">*</span><span className={validName === "invalid" ? "text-red-400 px-1 justify-end" : "hidden"}>required</span></label>
            <input type="text" className={`border text-gray-900 text-sm rounded-lg flex w-full p-2.5 focus:outline-blue-400 ${(validName === "invalid") ? "border-red-500" : "border-gray-300"}`} placeholder="e.g. John Doe"  maxLength={50} value={name}
            onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="w-full">
            <label  className="flex mb-2 text-sm font-medium text-gray-900">Phone number</label>
            <input type="text" className="border border-gray-300 text-gray-900 text-sm rounded-lg flex w-full p-2.5 focus:outline-blue-400" placeholder="0000000000"  pattern="[0-9]" maxLength={14} value={phone}
             onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <div className="w-full">
            <label className="flex mb-2 text-sm font-medium text-gray-900">Email address <span className="text-red-500 px-1">*</span><span className={validEmail === "invalid" ? "text-red-400 px-1 justify-end" : "hidden"}>required</span></label>
            <input type="email" className={`border text-gray-900 text-sm rounded-lg flex w-full p-2.5 focus:outline-blue-400 ${(validEmail === "invalid") ? "border-red-500" : "border-gray-300"}`} placeholder="e.g. name@travel.com" maxLength={50} pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" value={email}
             onChange={(e) => setEmail(e.target.value)}/>
        </div> 
        <div className="w-full">
            <label className="flex mb-2 text-sm font-medium text-gray-900">Destination</label>
            <input className=" border border-gray-300 text-gray-900 text-sm rounded-lg flex w-full p-2.5 focus:outline-blue-400" placeholder="Anywhere?" maxLength={50} value={destination}
             onChange={(e) => setDestination(e.target.value)}/>
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
           <span className="sr-only">select trip category</span>
        </div>
        ))}
            </div>
        </div>
        </div>
            <div className="w-full">
            <label className="flex mb-2 text-sm font-medium text-gray-900">Other information</label>
            <textarea className="border border-gray-300 text-gray-900 text-sm rounded-lg flex w-full h-40 p-2.5 focus:outline-blue-400" placeholder="Type your requests here..." maxLength={500} value={other}
             onChange={(e) => setOther(e.target.value)}/>
            </div> 
        <div className="flex items-center justify-center mb-4 sm:mb-0">
             <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm sm:text-lg w-full sm:w-1/3 px-5 py-2.5 place-content-center">Submit</button>
        </div>
    </div> 
    </form>
</div>  
</div>
     </div>
    </div>
    </>
  )
}

export default ContactModal