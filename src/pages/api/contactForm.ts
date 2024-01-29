import type { NextApiRequest, NextApiResponse } from 'next'
import {transporter, mailOptions} from "../../../service/nodemailer"
import { NextResponse } from "next/server"
import { render } from '@react-email/render';
import Email from "~/components/emails/Email";

import { Resend } from 'resend';

 
type ResponseData = {
  message: string
}

const resend = new Resend(process.env.EMAIL_PASS);


 
const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const {name, phone, email, destination, selectedDeparture, selectedReturn, selectedType, other} = req.body
    try {
        await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'khatija.cwh@gmail.com',
        subject: `New Enquiry from ${name}  `,
        react: Email({name, phone, email, destination, selectedDeparture, selectedReturn, selectedType, other})
      })
      res.status(200).json({ message: "success" })
    } catch (error: any) {
        console.log(error) 
        return  NextResponse.json({ message: error.message })
    }

}

export default handler;