import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
        <div>{children}</div>
        <Footer/>
      </main>
    );
  }