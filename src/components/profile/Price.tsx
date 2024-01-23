import React from 'react'

type priceProps = {
    price_excl: number | null
    price_incl: number | null
}

const Price: React.FC<priceProps> = ({price_excl, price_incl}) => {
  return (
    <div className="sm:grid grid-cols-2 lg:px-6 sm:px-3 py-10 lg:mx-5 justify-center items-center gap-6 lg-h-full hidden">
    <div className={(price_excl !== null) ? "flex flex-col" : "hidden"}>
        <h2 className="font-bold sm:text-lg">Excluding flights:</h2>
        <p className="text-gray-500">2 adults from only</p>
    </div>
    <div className={(price_excl !== null) ? `flex flex-row items-center flex-wrap` : `hidden`}>
        <h1 className="text-2xl font-bold mr-1 text-sky-800">R{price_excl}</h1>                      
        <p className=" text-gray-500">per room</p>
    </div>  
    <div className={(price_incl !== null) ? `flex flex-col` : `hidden`}>
        <h2 className="font-bold sm:text-lg">Including flights:</h2>
        <p className=" text-gray-500">2 adults from only</p>
    </div>
    <div className={(price_incl !== null) ? `flex flex-row items-center flex-wrap` : `hidden`}>
        <h1 className="text-2xl font-bold mr-1 text-sky-800">R{price_incl}</h1>                      
        <p className=" text-gray-500">per package</p>
    </div>
</div>
  )
}

export default Price