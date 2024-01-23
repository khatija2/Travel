import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatButton from "./buttons/ChatButton";

import { Inter, Figtree } from 'next/font/google';
 
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


export default function PageLayout({
    children,
  }: {
    children: React.ReactNode,
  }) {
    return (
      <main className={`${inter.variable} ${figtree.variable}`}>
        <Navbar/>
        <ChatButton/>
        <div>{children}</div>
        <Footer/>
      </main>
    );
  }