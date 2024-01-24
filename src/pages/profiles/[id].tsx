import React from 'react'
import type {
    NextPage,
    GetStaticPaths,
    GetStaticPropsContext,
  } from "next";
import Image from "next/image"
import ErrorPage from "next/error";
import {MdFlight} from 'react-icons/md'
import {MdOutlineNightShelter} from 'react-icons/md'
import {MdOutlineDirectionsCarFilled} from 'react-icons/md'
import {MdRestaurant} from 'react-icons/md'
import {AiOutlineCheck} from 'react-icons/ai'
import {IoInformationCircleOutline} from 'react-icons/io5'
import {MdHotel} from 'react-icons/md'
import Price from "~/components/profile/Price"
import PriceSmall from "~/components/profile/PriceSmall"
import Itinerary from "~/components/profile/Itinerary"
import { api } from "../../utils/api";
import { ssgHelper } from "~/server/api/ssgHelper";
import { LoadingPage } from "~/components/Loading";


type profileProps = {
    cities: {
        id: number;
        city: string;
    }[];
} & {
    createdAt: Date;
    title: string;
    description: string | null;
    nights: string;
    accommodation: string;
    flights: string;
    transfers: string;
    meals: string;
    id: string
}

const Profile: NextPage<profileProps> = ({id}) => {

    const { data: profile, isLoading } = api.profiles.getById.useQuery({ id });


    if (isLoading) return <LoadingPage/>;

    if (!profile) {
        return <ErrorPage statusCode={404} />;
      }


  return (
 
    <div className="p-4 lg:p-8 2xl:p-12 text-slate-800 bg-gray-100">
        <div key={profile.id}>
        <div className="flex flex-col sm:flex-row border bg-white">
            <div className="w-full sm:w-2/5 flex flex-col">
                <div>
                    <Image src={profile.image} alt="Cape Town" width={1000} height={300}></Image>
                </div>
                <Price price_excl={profile.price_excl} price_incl={profile.price_incl}/>
                <div className="sm:flex justify-center mx-4 mb-2 lg:mb-6 hidden">
                    <button className="w-3/4 py-3 text-white font-semibold bg-sky-800 rounded-lg">Enquire Now</button>
                </div> 
            </div>
            <div className="flex flex-col p-2 2xl:pl-9 2xl:pr-6 sm:pl-3.5 sm:pr-2 sm:w-3/5 w-full bg-gray-50">
                <div className="sm:text-3xl text-xl font-bold sm:mb-4 mb-2 text-sky-800">{profile.title}</div>
                <div>{profile.description}</div>
                <div className="flex flex-row items-center sm:gap-3 gap-2 text-xs sm:text-sm lg:text-base text-gray-500 py-2 flex-wrap">
                                <div className="flex flex-row items-center gap-1"><MdHotel/><p>{profile.nights}</p></div>
                                <div className="flex flex-row">
                                    <ul className="flex flex-row list-disc list-inside sm:gap-2 gap-1 flex-wrap ">
                                    {profile.cities.map((city) =>
                                        <li key={city.city}>{city.city}</li>)}
                                    </ul>
                                </div>
                            </div>
                <div className="grid grid-cols-2 gap-4 xl:gap-8 my-4">
                    <div>
                        <div className="flex flex-row items-center gap-1 font-bold text-sm sm:text-lg"><MdFlight/>Flights</div>
                        <div className="text-xs sm:text-base">{profile.flights}</div>
                     </div>
                     <div>
                        <div className="flex flex-row items-center gap-1 font-bold text-sm sm:text-lg"><MdOutlineDirectionsCarFilled/>Transfers</div>
                        <div className="text-xs sm:text-base">{profile.transfers}</div>
                    </div>
                     <div>
                        <div className="flex flex-row items-center gap-1 font-bold text-sm sm:text-lg"><MdOutlineNightShelter/>Accommodation</div>
                        <div className="text-xs sm:text-base">{profile.accommodation}</div>
                    </div>
                    <div>
                        <div className="flex flex-row items-center gap-1 font-bold text-sm sm:text-lg"><MdRestaurant/>Meals</div>
                        <div className="text-xs sm:text-base">{profile.meals}</div>
                    </div>
                    <div>
                        <div className={(profile.includes.length !== 0 ) ? "flex flex-row items-center gap-1 font-bold text-sm sm:text-lg" : "hidden"}><AiOutlineCheck/>Includes:</div>
                         <div>
                            <ul className="list-disc list-inside text-xs sm:text-base">
                                {profile.includes.map((include) =>
                                 <li key={include[0]}>{include}</li>
                                 )} 
                            </ul>
                         </div>
                    </div>
                    <div>
                    <div className={(profile.info.length !== 0 ) ? "flex flex-row items-center gap-1 font-bold text-sm sm:text-lg" : "hidden"}><IoInformationCircleOutline/>Important Info</div>
                        <div>
                            <ul className="list-disc list-inside text-xs sm:text-base">
                            {profile.info.map((infoItem) =>
                                 <li key={infoItem[0]}>{infoItem}</li>
                                 )} 
                            </ul>
                        </div>
                    </div>
                </div>             
            </div>
        </div>
        <PriceSmall price_excl={profile.price_excl} price_incl={profile.price_incl}/>
        </div>
        <Itinerary profileId={profile.id} />
    </div>

  )
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
      paths: [],
      fallback: "blocking",
    };
  };

  export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
  ) {
    const id = context.params?.id;
    const profileId = context.params?.id
  
    if (id == null) {throw new Error("This page could not be found")}

  const ssg = ssgHelper();
  await ssg.profiles.getById.prefetch({ id });

  if(typeof profileId === "string")
  {await ssg.itinerary?.getbyProfileId.prefetch({profileId})}

    return {
        props: { 
          trpcState: ssg.dehydrate(),
          id, profileId  },
      };
}

export default Profile