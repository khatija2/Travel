import React, {useState, useEffect} from 'react'
import type {
    NextPage,
    GetStaticPaths,
    GetStaticPropsContext,
  } from "next";
import Link from 'next/link'
import Image from 'next/image'
import { api } from "../../utils/api";
import { ssgHelper } from "~/server/api/ssgHelper";
import ErrorPage from "next/error";
import {SlArrowLeft} from 'react-icons/sl'
import {SlArrowRight} from 'react-icons/sl'
import ButtonPrev from "../buttons/ButtonPrev";
import ButtonNext from "../buttons/ButtonNext";

const Popular: NextPage = () => {


    const [currentIndex, setCurrentIndex] = useState(0);


  
  
    const { data: destinations } = api.destinations.getByValue.useQuery();

    if (!destinations) {
        return <ErrorPage statusCode={404} />;
      }
       
    const slideSize = 2  
    const totalSlides = Math.ceil(destinations.length / slideSize);
    const isLastSlide = currentIndex === totalSlides - 1;
    const isFirstSlide = currentIndex === 0;
      
  
    const handleNext = () => {
      setCurrentIndex((currentIndex + 1) % totalSlides);
    };
  
    const handlePrev = () => {
      setCurrentIndex((currentIndex - 1 + totalSlides) % totalSlides);
    };
  
    const renderCards = () => {
      const start = currentIndex * slideSize;
      const end = Math.min(start + slideSize, destinations.length);
      const cards = [];
  
      for (let i = start; i < end; i++) {
        const card = destinations[i];
        if (card) {
          cards.push(
            <Link href=" " className=" hover:opacity-30 flex" key={card.id}>
            <div className="items-center justify-center flex text-white z-0 text-xl 2xl:text-3xl font-bold relative  ">
                <div className="flex items-center justify-center w-full  z-0 "> <Image src={card.image} alt="" width={250} height={25} className="flex rounded-lg z-0r" /></div>
                <div className="flex items-center justify-center w-full h-full z-50 absolute ">{card.destination}</div>
            </div>
        </Link>
          );
        }
      }
  
      return cards;
    };
  


   


  return (
<>
    <div className="sm:flex justify-center flex-col items-center w-full px-20 py-4 mt-2 hidden">
        <div className=" sm:w-full flex sm:justify-start sm:pl-28 lg:pl-40 2xl:pl-80 text-lg font-bold ">
            <h1>Popular Destinations</h1>
        </div>
        <span className="sr-only">Select a Destination</span>
        <div className="flex items-center justify-center py-8 w-3/4 h-full relative">
            <div className="grid grid-cols-3 gap-8 2xl:gap-20 w-full h-full relative ">
            {destinations.map((destination) =>
            <Link href={`/popular-destination/${destination.destination}`} className=" hover:opacity-30 flex" key={destination.id}>
            <div className="items-center justify-center flex text-white z-0 text-xl 2xl:text-3xl font-bold relative  ">
                <div className="flex items-center justify-center w-full h-50 z-0 "> <Image src={destination.image} alt="popular destination link" width={500} height={50} className="flex rounded-lg z-0r" /></div>
                <div className="flex items-center justify-center w-full h-full z-50 absolute ">{destination.destination}</div>
            </div>
            </Link>
            )}
            </div>
        </div>
    </div>

<div className="w-full flex items-center justify-center my-4 sm:hidden">
     <div className="flex flex-col items-center justify-center relative w-4/5 p-10 gap-8 border border-gray-200 rounded-lg font-bold">
        <h2>Popular Destinations</h2>
       {renderCards()}
    </div>
    <div className="flex justify-between items-center absolute w-full">
    <span className="sr-only">Carousel</span>
   <ButtonPrev  onClick={handlePrev} disabled={isFirstSlide} />
   <ButtonNext onClick={handleNext} disabled={isLastSlide}/>
    </div>
</div>
</>
  )
}

export default Popular