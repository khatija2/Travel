import React, {useState, useEffect} from 'react'
import CardContainer from "~/components/cards/CardContainer"
import { Decimal } from "@prisma/client/runtime/library";
import ButtonNext from "./buttons/ButtonNext";
import ButtonPrev from "./buttons/ButtonPrev";
import Sort from "./search-bars/Sort";

type resultsProps = {
  info: {
    cities: {
      id: number;
      city: string;
  }[];
  createdAt: Date;
  title: string;
  nights: string;
  image: string;
  id: string;
  rating: Decimal | null;
  price_excl: number | null;
  price_incl: number | null
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
          key = {card.id}
          image = {card.image}
          title = {card.title}
          cities = {card.cities}
          nights = {card.nights}
          price_excl = {card.price_excl}
          price_incl = {card.price_incl}
          id = {card.id}
          rating = {card.rating}
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
      <button onClick={() => setCurrentIndex(i)} className="rounded-lg px-2 py-1 text-gray-700  hover:bg-gray-300 text-sm" key={i}>{i + 1}</button>)
    }
    return pages
  }

  
  const sortDataAscending = () => {
    const sortedData = [...info];
    sortedData.sort((a, b) => {
      let priceA = a.price_excl !== null ? a.price_excl : Infinity;
      let priceB = b.price_excl !== null ? b.price_excl : Infinity;
      if (priceA === Infinity && a.price_incl !== null) {
        priceA = a.price_incl;
      }
      if (priceB === Infinity && b.price_incl !== null) {
        priceB = b.price_incl;
      }
      return priceA - priceB;
    });
    setSortedData(sortedData);
  };

  const sortDataDescending = () => {
    const sortedData = [...info];
    sortedData.sort((a, b) => {
      let priceA = a.price_excl !== null ? a.price_excl : Infinity;
      let priceB = b.price_excl !== null ? b.price_excl : Infinity;
      if (priceA === Infinity && a.price_incl !== null) {
        priceA = a.price_incl;
      }
      if (priceB === Infinity && b.price_incl !== null) {
        priceB = b.price_incl;
      }
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
        <div className="flex flex-col justify-center items-center w-4/5 sm:w-full sm:px-6 lg:px-12">
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