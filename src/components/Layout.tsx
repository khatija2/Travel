import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {BsChatRightDots} from "react-icons/bs"

import { Inter, Figtree, Nunito } from 'next/font/google';
 
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});


  const figtree = Figtree({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font- figtree',
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
      <main className={`${inter.variable} ${figtree.variable} ${nunito.variable}`}>
        <Navbar/>
        <div className="z-50 fixed bottom-2 sm:bottom-4 right-2 sm:right-4"><button className="bg-indigo-900 border border-gray-50 p-2 text-xs sm:text-lg flex flex-row items-center justify-center gap-1 shadow-lg text-white rounded-lg hover:opacity-50"><BsChatRightDots/>Let's Chat</button></div>
        <div>{children}</div>
        <Footer/>
      </main>
    );
  }