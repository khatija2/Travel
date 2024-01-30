import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Tailwind,
  Text,
  Row,
} from "@react-email/components";

type EmailProps = {
   name: string;
    phone: string; 
    email: string; 
    destination: string;
    selectedDeparture: string;
    selectedReturn: string;
    selectedType: string; 
    other: string;
    title: string;
}



const Email: React.FC<EmailProps> = ({name, phone, email, destination, selectedDeparture, selectedReturn, selectedType, other, title}) => {
  return (
    <Html>
      <Head/>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="text-center text-blue-900">
          <Heading>New Enquiry</Heading>
          </Container>
          <Container className="mx-auto p-4 text-[28px] bg-blue-50">
          <Row className="border-t-2 border-solid border-gray px-2"><Text key="name"><strong>Package: </strong> {title}</Text></Row>
          <Row className="border-t-2 border-solid border-gray px-2"><Text key="name"><strong>Name: </strong> {name}</Text></Row>
          <Row className="border-t-2 border-solid border-gray px-2" ><Text key="phone"><strong>Telephone Number:</strong> {phone}</Text></Row>
          <Row className="border-t-2 border-solid border-gray px-2"><Text  key="email" ><strong>Email:</strong> {email}</Text></Row>
          <Row className="border-t-2 border-solid border-gray px-2"><Text key="destination"><strong>Destination:</strong> {destination}</Text></Row>
          <Row className="border-t-2 border-solid border-gray px-2"><Text key="depart"><strong>Departure Date:</strong> {selectedDeparture}</Text></Row>
          <Row className="border-t-2 border-solid border-gray px-2"><Text key="return"><strong>Return Date:</strong> {selectedReturn}</Text></Row>
          <Row className="border-t-2 border-solid border-gray px-2"><Text  key="type"><strong>Trip Type:</strong> {selectedType}</Text></Row>
          <Row className="border-t-2 border-solid border-gray px-2"><Text key="other"><strong>Other Information:</strong> {other}</Text></Row>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default Email

