'use client'
import React from 'react'
import {SlArrowRight} from 'react-icons/sl'

type ButtonProps = {
onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
disabled: boolean
tiny?: string
}


const ButtonNext: React.FC<ButtonProps> = ({onClick, disabled, tiny}) => {
  return (
    <button onClick={onClick} disabled={disabled}   type="button" className="z-20 flex items-center justify-center h-full px-2 cursor-pointer">
    <span className={`inline-flex items-center justify-center ${tiny ? "w-4 h-4" : "w-8 h-8"} rounded-full text-slate-700  sm:w-10 sm:h-10 bg-gray-100 bg-opacity-70 hover:bg-white hover:bg-opacity-25`}>
    <SlArrowRight/>
    <span className="sr-only">Next</span>
    </span>
</button>
  )
}

export default ButtonNext