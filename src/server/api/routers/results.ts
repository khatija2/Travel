import { z } from "zod";
import type { Trip } from "@prisma/client";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

 


const convertBudgetRange = (range: string): [number, number] => {
  const sanitizedRange = range.replace(/[^\w\s-]/g, ''); // Remove non-alphanumeric characters
  const [direction, value] = sanitizedRange.split(/(?<=R)/);
  let upper: number;
  let lower: number;

  if (direction?.toLowerCase() === 'less than r') {
    lower = 0;
    upper = parseInt((value || '').replace(/[^\d]/g, ''), 10) || 0;
  } else if (direction?.toLowerCase() === 'greater than' || direction?.toLowerCase() === 'none') {
    lower = parseInt((value || '').replace(/[^\d]/g, ''), 10) || 0;
    upper = Number.POSITIVE_INFINITY;
  } else if (value && value.includes('-')) {
    const [lowerStr = '', upperStr = ''] = value.split('-').map(v => v.replace(/[^\d]/g, ''));
    lower = parseInt(lowerStr, 10) || 0;
    upper = parseInt(upperStr, 10) || 0;
  } else {
    lower = parseInt((value || '').replace(/[^\d]/g, ''), 10) || 0;
    upper = lower;
  }

  return [lower, upper];
};


export const resultsRouter = createTRPCRouter({

  getByValue: publicProcedure
  .input(z.object({  
    destination: z.string().nullable().optional(),
    budget: z.string().nullable().optional(), 
    selectedType: z.string().nullable().optional(), 
    departDate: z.date().nullable().optional(),
    returnDate: z.date().nullable().optional(),
    page: z.string().nullable().optional(),
 }))
  .query(async ({ ctx, input}) => {

    const {
      destination,
      budget,
      selectedType,
      departDate,
      returnDate,
      page,
    } = input;

    const stringToTripEnum = (input: string): Trip | undefined => {
      switch (input) {
        case 'HOLIDAYS':
        case 'CRUISES':
        case 'TOURS':
        case 'RESORTS':
        case 'FLIGHTS':
        case 'BUSINESS':  
          return input as Trip;
        default:
          return undefined;
      }
    };



const tripEnum = selectedType ? stringToTripEnum(selectedType.toUpperCase()) : undefined;

const [budgetLower, budgetUpper] = budget? convertBudgetRange(budget) : "null";

const filters:object[] = []

if (destination && (destination !== "null")) {
  filters.push(  
    {
    OR: [
      { cities: { some: { city: destination}}   },
      { location: { some: { location: destination} }  }
        ]  
    }
  )
} 

if ( page !== null && page !== "deals" ) {
  filters.push( { trip_index: {has: page}
  })
}

if ( page === "deals" ) {
  filters.push( {deal: { isNot: null }
  })
}


if (budget !== "null" && (budgetUpper !== 0 || budgetUpper !== Infinity)) {
  filters.push({
    OR: [
      {AND: [
      { price_incl:  { gte: budgetLower } },
      { price_incl: { lte: budgetUpper} },
      ]},
      {AND: [
      { price_excl:  { gte: budgetLower} },
      { price_excl: { lte: budgetUpper } },
      ]}
        ]    
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
          AND: filters
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
    
  
        if (!results) return;
        return results
     

  
      }),
  

});