'use client'

import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import {SlArrowLeft} from 'react-icons/sl'
import {SlArrowRight} from 'react-icons/sl'
import type {
  NextPage,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";
import ErrorPage from "next/error"
import { api } from "~/utils/api";
import { ssgHelper } from "~/server/api/ssgHelper";
import CardContainer from "../cards/CardContainer"
import ButtonPrev from "../buttons/ButtonPrev"
import ButtonNext from "../buttons/ButtonNext"



const Specials: NextPage = () => {


  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideSize, setSlideSize] = useState(3);

 
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 576) { 
        setSlideSize(1);
      } 
      else if (screenWidth <= 912 ) { 
        setSlideSize(2);
      } 
      else {
        setSlideSize(3); 
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);





  const { data: specials } = api.specials.getSome.useQuery();
   
    if (!specials) {
        return <ErrorPage statusCode={404} />;;
      }
     
  const totalSlides = Math.ceil(specials.length / slideSize);
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
    const end = Math.min(start + slideSize, specials.length);
    const cards = [];

    for (let i = start; i < end; i++) {
      const card = specials[i];
      if (card) {
        cards.push(
          <CardContainer
          key={card.profile.id}
          image={card.profile.image}
          title={card.profile.title}
          cities ={card.profile.cities}
          nights= {card.profile.nights}
          price_excl= {card.profile.price_excl}
          price_incl ={card.profile.price_incl}
          id ={card.profile.id}
          rating ={card.profile.rating}
          />
        );
      }
    }

    return cards;
  };


    
 
      
      
    
    

      
    


  return (
    <div className="w-full h-200  cards-center px-10 sm:px-20 sm:pt-2 sm:pb-6">
      <div className="flex flex-row justify-center">
       <div className="flex gap-2 2xl:gap-6">
        <div>
          <ButtonPrev onClick={handlePrev} disabled={isFirstSlide} />
        </div>
        <div className="flex sm:gap-4 2xl:gap-6">
   
          {renderCards()}
       
        </div>
       <div>
        <ButtonNext onClick={handleNext} disabled={isLastSlide}/>
       </div>
     </div>
    </div>
  </div>
);

           

}







export default Specials