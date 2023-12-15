import { boolean, z } from "zod";
import { TRPCError } from "@trpc/server";
import { Trip } from "@prisma/client";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import dayjs from "dayjs";
import { Prisma } from "@prisma/client";



const convertBudgetRange = (range: string): [number, number] => {
  const [lower, upper] = range
  .split('-')
  .map(value => parseInt(value.replace(/[^\d]/g, ''), 10))
  .map((value: any) => (isNaN(value) ? 0 : value))
  return [lower, upper];
};




export const resultsRouter = createTRPCRouter({

  getByValue: publicProcedure
  .input(z.object({  
    selectedDestination: z.string().nullable().optional(),
    selectedBudget: z.string().nullable().optional(), 
    selectedType: z.string().nullable().optional(), 
    departDate: z.date().nullable().optional(),
    returnDate: z.date().nullable().optional(), }))
  .query(async ({ ctx, input}) => {

    const {
      selectedDestination,
      selectedBudget,
      selectedType,
      departDate,
      returnDate,
    } = input;


    const stringToTripEnum = (input: string): Trip | undefined => {
      switch (input) {
        case 'HOLIDAYS':
        case 'CRUISES':
        case 'TOURS':
        case 'RESORTS':
        case 'FLIGHTS':
          return input as Trip;
        default:
          return undefined;
      }
    };

    const tripEnum = selectedType ? stringToTripEnum(selectedType.toUpperCase()) : undefined;

    console.log(tripEnum)

    const [budgetLower, budgetUpper] = selectedBudget? convertBudgetRange(selectedBudget) : "";

    const destination = (selectedDestination !== null) ? selectedDestination?.toLowerCase() : undefined

const filters = []

if (destination !== undefined) {
  filters.push(  
    {  OR:    [
      { cities: { some: { city: destination} }  },
      { location: { some: { location: destination} }  },
    ],
  })
}

if (selectedBudget && (budgetLower !== undefined && budgetUpper !== undefined)) {
  filters.push( {
    OR: [
      {   AND: [
        { price_incl: { gte: budgetLower.toString() } },
        { price_incl: { lte: budgetUpper.toString() } },
      ], },
      {   AND: [
        { price_excl: { gte: budgetLower.toString() } },
        { price_excl: { lte: budgetUpper.toString() } },
      ],},
    ],
    })
}

if ( tripEnum !== undefined ) {
  filters.push( { trip_index: {has: tripEnum }
  })
}

if   ( returnDate !== null ) {
  filters.push(  { start_date: {lte: returnDate as Date}  })
}

if  ( departDate !== null) {
  filters.push({ end_date: { gte: departDate as Date }})
}


     const results = await ctx.prisma.profile.findMany({
        where: {
          AND: filters,
        },
        select: {
            rating: true,
            title: true,
            cities: true,
            nights: true,
            image: true,
            price_excl: true,
            price_incl: true,
            id: true,
            createdAt: true
         },
      })
    
  
        if (!results) throw new TRPCError({ code: "NOT_FOUND" })
        return results
     
    
  
      }),
  

});