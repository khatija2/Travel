import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from "next/server"
import Email from "~/components/emails/Email";
import { Resend } from 'resend';

 
type ResponseData = {
  message: string
}

type ContactProps = {
  name: string;
   phone: string; 
   email: string; 
   destination: string;
   selectedDeparture: string;
   selectedReturn: string
   selectedType: string; 
   other: string
}

const resend = new Resend(process.env.EMAIL_PASS);


 
const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const {name, phone, email, destination, selectedDeparture, selectedReturn, selectedType, other}: ContactProps  = req.body
    try {
        await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'khatija.cwh@gmail.com',
        subject: `New Enquiry from ${name}  `,
        react: Email({name, phone, email, destination, selectedDeparture, selectedReturn, selectedType, other})
      })
      res.status(200).json({ message: "success" })
    } catch (error: any) {
        return  NextResponse.json({ message: error.message })
    }

}

export default handler;