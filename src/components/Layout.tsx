import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatButton from "./buttons/ChatButton";

import { Inter, Nunito } from 'next/font/google';
 
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});


  const nunito = Nunito({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito',
  });

export default function PageLayout({
    children,
  }: {
    children: React.ReactNode,
  }) {
    return (
      <main className={`${inter.variable} ${nunito.variable}`}>
        <Navbar/>
        <ChatButton/>
        <div>{children}</div>
        <Footer/>
      </main>
    );
  }