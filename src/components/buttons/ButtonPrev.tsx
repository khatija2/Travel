'use client'
import React from 'react'
import {SlArrowLeft} from 'react-icons/sl'

type ButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean
  tiny?: string
  
  }

const ButtonPrev: React.FC<ButtonProps>  = ({onClick, disabled, tiny}) => {
  return (
<button onClick={onClick} disabled={disabled} type="button" className={`z-30 flex items-center justify-center h-full px-2 cursor-pointer`}>
    <span className={`inline-flex items-center justify-center ${tiny ? `w-4 h-4 text-xs` :  `w-8 h-8`  } rounded-full text-slate-700  sm:w-10 sm:h-10 bg-gray-100/70  hover:bg-white/20`}>
    <SlArrowLeft/>
    <span className="sr-only">Previous</span>
    </span>
</button>
  )
}

export default ButtonPrev