import React, {useState, useEffect} from 'react'
import Link from "next/link"
import CardContainer from "~/components/cards/CardContainer"
import { Decimal } from "@prisma/client/runtime/library";
import ButtonNext from "./buttons/ButtonNext";
import ButtonPrev from "./buttons/ButtonPrev";
import Sort from "./search-bars/Sort";

type resultsProps = {
info: {
  title: string;
  image: string;
  cities: string[];
  nights: string;
  price_excl: string | null;
  price_incl: string | null;
  id: string;
  rating: Decimal | null;
  createdAt: Date
}[] 
}


const ResultsContainer: React.FC<resultsProps> = ({info}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideSize, setSlideSize] = useState(9);
  const [sortedData, setSortedData] = useState(info);
 
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 576) { 
        setSlideSize(3);
      } 
      else if (screenWidth <= 912 ) { 
        setSlideSize(6);
      } 
      else if (screenWidth < 1536 ) { 
        setSlideSize(9);
      } 
      else {
        setSlideSize(15); 
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const totalSlides = Math.ceil(info.length / slideSize);
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
    const end = Math.min(start + slideSize, info.length);
    const cards = [];

    for (let i = start; i < end; i++) {
      const card = sortedData[i];
      if (card) {
        cards.push(
          <CardContainer
          image={card.image}
          title={card.title}
          cities ={card.cities}
          nights= {card.nights}
          price_excl= {card.price_excl}
          price_incl ={card.price_incl}
          id ={card.id}
          rating ={card.rating}
          />
        );
      }
    }

    return cards;
  };

  const pageIndex = () => {
    const pages = []
    for (let i=0; i < totalSlides; i++) {
      pages.push(
      <button onClick={() => setCurrentIndex(i)} className="rounded-lg px-2 py-1 text-gray-700  hover:bg-gray-300 text-sm">{i + 1}</button>)
    }
    return pages
  }

  
  const sortDataAscending = () => {
    const sortedData = [...info];
    sortedData.sort((a, b) => {
      const priceA = parseFloat(a.price_excl || a.price_incl || 'Infinity');
      const priceB = parseFloat(b.price_excl || b.price_incl || 'Infinity');
      return priceA - priceB;
    });
    setSortedData(sortedData);
  };

  const sortDataDescending = () => {
    const sortedData = [...info];
    sortedData.sort((a, b) => {
      const priceA = parseFloat(a.price_excl || a.price_incl || 'Infinity');
      const priceB = parseFloat(b.price_excl || b.price_incl || 'Infinity');
      return priceB - priceA;
    });
    setSortedData(sortedData);
  };

  const sortDataNewest = () => {
    const sortedData = [...info];
    sortedData.sort((a, b) => {
      const timestampA = new Date(a.createdAt).getTime();
      const timestampB = new Date(b.createdAt).getTime();
      return timestampB - timestampA;
    });
    setSortedData(sortedData);
  }

    const sortDataOldest = () => {
      const sortedData = [...info];
      sortedData.sort((a, b) => {
        const timestampA = new Date(a.createdAt).getTime();
        const timestampB = new Date(b.createdAt).getTime();
        return timestampA - timestampB;
      });
      setSortedData(sortedData);
    }



  return (
      <div className="flex flex-col items-center justify-center">
          <Sort onClickAscending={sortDataAscending} onClickDescending={sortDataDescending} onClickNewest={sortDataNewest} onClickOldest={sortDataOldest}/>
        <div className="flex flex-col justify-center items-center w-4/5 sm:w-full sm:px-6 lg:px-12 ">
              <div className="sm:grid grid-cols-3 2xl:grid-cols-5 gap-4 lg:gap-6 2xl:gap-10">
                {renderCards()}
              </div>
             <div className="flex flex-row items-center justify-center  sm:p-4 lg:p-8 flex-nowrap z-0">
                <ButtonPrev onClick={handlePrev} disabled={isFirstSlide} tiny="tiny" />
               {pageIndex()}
                <ButtonNext onClick={handleNext} disabled={isLastSlide} tiny="tiny"/>
             </div>
        </div>
    </div>
  )
}

export default ResultsContainer