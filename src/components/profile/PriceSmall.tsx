import React from 'react'

type priceProps = {
    price_excl: number | null
    price_incl: number | null
}

const PriceSmall: React.FC<priceProps> = ({price_excl, price_incl}) => {
  return (
    <div className="flex flex-col mt-4 py-2 border border-gray-400 sm:hidden ">
    <div className=" flex  flex-col justify-center items-center gap-2">
            <div className={(price_excl !== null) ? `flex flex-col` : `hidden`}>
                <h2 className="font-bold sm:text-lg">Excluding flights:</h2>
                <p className=" text-gray-500">2 adults from only</p>
            </div>
            <div className={(price_excl !== null) ? `flex flex-row items-center flex-wrap` : `hidden`}>
                <h1 className="text-xl font-bold mr-1 text-sky-800">R{price_excl}</h1>                      
                <p className=" text-gray-500">per room</p>
            </div>  
            <div className={(price_incl !== null) ? `flex flex-col` : `hidden`}>
                <h2 className="font-bold sm:text-lg">Including flights:</h2>
                <p className=" text-gray-500">2 adults from only</p>
            </div>
            <div className={(price_incl !== null) ? `flex flex-row items-center flex-wrap` : `hidden`}>
                <h1 className="text-xl font-bold mr-1 text-sky-800">R{price_incl}</h1>                      
                <p className=" text-gray-500">per package</p>
            </div>
    </div>
    <div className="flex justify-center items-center mt-4">
        <button className="w-3/4 py-3 text-white font-semibold bg-sky-800 rounded-lg">Enquire Now</button>
    </div> 
</div>
  )
}

export default PriceSmall