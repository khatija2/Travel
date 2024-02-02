import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {AiOutlineFacebook} from 'react-icons/ai' 
import {AiOutlineInstagram} from 'react-icons/ai' 
import {GiHamburgerMenu} from 'react-icons/gi'



export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = () => {
    setMenuOpen(!menuOpen)
  }

  return (
	  <>
<div className="font-nunito">
  <nav className="bg-white">
  <div className="flex flex-wrap items-center justify-between mx-auto py-4 px-6">
      <Link href="/" className="flex items-center">
        <Image src="/images/t-flag.jpg" alt="Logo" height={10} width={15}  className="h-8 w-auto mr-3" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-sky-900">
          Travel
        </span>
      </Link>
    <div className="flex justify-center">
      <div className="flex items-center gap-2 md:hidden">
        <span className="hover:text-sky-700"><Link href=""> <span className="sr-only">Facebook page</span><AiOutlineFacebook size={25}/></Link></span>
        <span className="hover:text-sky-700"><Link href=""> <span className="sr-only">Instagram page</span><AiOutlineInstagram size={25}/></Link></span>
      </div>
      <button onClick={handleNav} type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-900 rounded-lg md:hidden hover:bg-gray-200" aria-controls="navbar" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <GiHamburgerMenu size={25}/>
      </button>
    </div>
    <div className={menuOpen ? "w-full md:block md:w-auto" : "hidden md:flex"} >
      <ul className="font-medium text-gray-900 flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:text-lg">
        <li>
         <div className="hidden items-center gap-2 md:flex">
          <span className="hover:text-sky-700"><Link  aria-label="Facebook link" href=""><AiOutlineFacebook size={25}/></Link></span>
          <span className="hover:text-sky-700"><Link aria-label="Instagram link" href=""><AiOutlineInstagram size={25}/></Link></span>
         </div>
        </li>
        <li>
          <Link href="/" className="block py-2 pl-3 pr-4  rounded  hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-sky-700 md:p-0" onClick={handleNav}>Home</Link>
        </li>
        <li>
          <Link href="/about" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-sky-700 md:p-0"  onClick={handleNav}>About Us</Link>
        </li>
        <li>
          <Link href="/payments" className="block py-2 pl-3 pr-4  rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-sky-700 md:p-0"  onClick={handleNav}>Payments</Link>
        </li>
        <li>
          <Link href="/contact" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-sky-700 md:p-0"  onClick={handleNav}>Contact Us</Link>
        </li>
      </ul>
    </div>
  </div>
  </nav>
  <nav className="bg-sky-900">
    <div className="sm:pl-6 py-3 2xl:px-8">
        <div className="flex items-center justify-center sm:justify-start">
            <ul className="flex flex-row mt-0 gap-3 justify-between sm:space-x-8 font-semibold md:text-lg">
                <li>
                    <Link href="/holidays" className=" block text-white rounded p-1 hover:bg-sky-700">Holidays</Link>
                </li>
                <li>
                    <Link href="/tours" className="block text-white rounded p-1 hover:bg-sky-700">Tours</Link>
                </li>
                <li>
                    <Link href="/cruises" className="block text-white rounded p-1 hover:bg-sky-700">Cruises</Link>
                </li>
                <li>
                    <Link href="/deals" className="block text-white rounded p-1 hover:bg-sky-700">Deals</Link>
                </li>
            </ul>
        </div>
    </div>
  </nav>
</div>
		  </>

)
}