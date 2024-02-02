'use client'
import React from 'react'
import Image from "next/image"
import Link from "next/link"
import {IoMdStar} from 'react-icons/io'
import {IoMdStarHalf} from 'react-icons/io'
import {IoMdStarOutline} from 'react-icons/io'
import {MdNightlight} from 'react-icons/md'
import {SlLocationPin} from 'react-icons/sl'
import { Decimal } from "@prisma/client/runtime/library"


type cardProps = {
        title: string;
        cities:{
            id: number;
            city: string;
        }[]
        nights: string;
        price_excl: number | null;
        price_incl: number | null;
        image: string;
        id: string;
        rating: number | null;
}


const CardContainer: React.FC<cardProps>  = ({title, cities, nights, price_excl, price_incl, image, id, rating}) => {


    const renderStars: (rating: number) => React.ReactNode = (rating: number) => {
 
        const wholeStars = Math.floor(rating)

        
        const starsArray = [];
    
        for (let i=1; i <= wholeStars; i++) {
          
          if (wholeStars) {
            starsArray.push(
                <IoMdStar key={i} color="#facc15"/>
            );
          }
        }
  
        const halfStar = rating - wholeStars >= 0.25 && rating - wholeStars <= 0.75

        if (halfStar) {
            starsArray.push(
              <IoMdStarHalf  key="half" color="#facc15" />
            );
          }


        const remainingStars = 5 - starsArray.length;

        for (let i=1; i <= remainingStars; i++) {
              starsArray.push(
                <IoMdStarOutline key={`outline-${i}`} color="#facc15"/>
              );
          }

          return starsArray
    }

    const renderOutline = () => {

        const starOutlineArray = []

        for (let i=1; i <= 5; i++) {
             starOutlineArray.push(
                <IoMdStarOutline key={`nofilloutline-${i}`} color="#facc15"/>
              )
          }
          return starOutlineArray
    }
   



  return (
 
<>
    <div key={id}  className="h-360 sm:h-380 w-auto bg-white border border-gray-700 rounded-lg shadow  px-3 pt-3  mb-4 sm:mb-0 z-0">
        <div className="px-2 max-h-180">
            <Image src={image} alt="destination" width={640} height={480} className="rounded-lg" />
        </div>
        <div className="flex flex-col justify-between py-2 min-h-180">
            <div className="flex items-end gap-0.5">
               {rating !== null ? renderStars(rating) : renderOutline()}
               <span className="text-xs self-end">{rating}</span>
            </div>
            <div className=" h-20 xl:text-lg  py-1 font-bold">
                <h1 className="line-clamp-3">{title}</h1>
            </div>
            <div className="flex flex-row items-center gap-3 text-xs lg:text-sm text-gray-500 py-2 min-h-full">
                <div className="flex flex-row items-center gap-1"><MdNightlight/><p>{nights}</p></div>
                <div className={(cities?.length !== 0 ) ? "flex flex-row items-center gap-1" : "flex flex-row items-center gap-1 opacity-0"} key={cities?.length}><SlLocationPin/><p>{cities?.length} cities</p></div>
            </div>
            <div className="flex flex-row justify-between items-end min-h-full" >
                    <div className={(price_excl || price_incl) ? "opacity-100" : "opacity-0"}>
                        <p>From</p>
                    <h1 className="font-bold xl:text-xl">R {price_excl || price_incl}</h1>
                    </div>
                <div>
                     <Link href={`/profiles/${id}`}>
                    <div  className="bg-blue-700 hover:bg-blue-800 text-white text-sm xl:text-lg p-2 lg:p-2.5 rounded-lg">View Deal</div>
                    </Link>
                </div>
            </div>
        </div>
      </div>
</>
  )
}

export default CardContainer