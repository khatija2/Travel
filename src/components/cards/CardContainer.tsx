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
        rating: Decimal | null;
}


const CardContainer: React.FC<cardProps>  = ({title, cities, nights, price_excl, price_incl, image, id, rating}) => {

  return (
 
<>
    <div key={id}  className="max-w-sm bg-white border border-gray-700 rounded-lg shadow flex-col px-3 pt-3 flex mb-4 sm:mb-0 z-0">
        <div className="flex px-2">
            <Image src={image} alt="" width={400} height={50} className="rounded-lg" />
        </div>
            <div className="flex flex-col justify-between py-2">
            <div className="flex items-center lg:text-xl">
                <IoMdStar color="#facc15"/>
                <IoMdStar color="#facc15"/>
                <IoMdStar color="#facc15"/>
                <IoMdStarHalf color="#facc15" />
                <IoMdStarOutline color="#facc15" />
            </div>
            <div className="align-center h-20  lg:text-xl  py-1 font-bold">
                <h1 className="line-clamp-3">{title}</h1>
                </div>
            <div className="flex flex-row items-center gap-3 text-xs lg:text-sm text-gray-500 py-2">
                <div className="flex flex-row items-center gap-1"><MdNightlight/><p>{nights}</p></div>
                <div className={(cities?.length !== 0 ) ? `flex flex-row items-center gap-1` : `flex flex-row items-center gap-1 opacity-0`} key={cities?.length}><SlLocationPin/><p>{cities?.length} cities</p></div>
            </div>
            <div className="flex flex-row justify-between items-end" >
                    <div className={(price_excl || price_incl) ? `opacity-100` : `opacity-0`}>
                        <p>From</p>
                    <h1 className="font-bold lg:text-2xl">R {price_excl || price_incl}</h1>
                    </div>
                <div>
                     <Link href={`/profiles/${id}`}>
                    <div  className="bg-blue-700 hover:bg-blue-800 text-white text-sm lg:text-lg p-2 lg:p-2.5 rounded-lg">View Deal</div>
                    </Link>
                </div>

            </div>
        </div>
    </div>
</>
  )
}

export default CardContainer