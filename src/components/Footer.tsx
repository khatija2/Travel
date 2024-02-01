import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {AiOutlineFacebook} from 'react-icons/ai' 
import {AiOutlineInstagram} from 'react-icons/ai' 

const Footer = () => {
  return (
    
<footer className="bg-gray-50 mt-4">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-4 md:mb-0 hidden sm:flex">
              <Link href="/" className="flex items-center">
                  <Image src="/images/t-flag.jpg" height={10} width={15}
                   className="h-8 w-auto mr-3" alt="Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap">Travel</span>
              </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Site Links</h2>
                  <ul className="text-gray-600 text-sm flex flex-col gap-1 sm:gap-2">
                      <li>
                          <Link href="/holidays" className="hover:underline">Holidays</Link>
                      </li>
                      <li>
                          <Link href="/tours" className="hover:underline">Tours</Link>
                      </li>
                      <li>
                          <Link href="cruises" className="hover:underline">Cruises</Link>
                      </li>
                      <li>
                          <Link href="/deals" className="hover:underline">Deals</Link>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Company</h2>
                  <ul className="text-gray-600 text-sm flex flex-col gap-1 sm:gap-2">
                      <li>
                          <Link href="/about" className="hover:underline">About Us</Link>
                      </li>
                      <li>
                          <Link href="/payments" className="hover:underline">Payments</Link>
                      </li>
                      <li>
                          <Link href="/contact" className="hover:underline">Contact US</Link>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
                  <ul className="text-gray-600 text-sm  flex flex-col gap-1 sm:gap-2">
                      <li>
                          <Link href="/privacy-Policy" className="hover:underline">Privacy Policy</Link>
                      </li>
                      <li>
                          <Link href="/terms&Conditions" className="hover:underline">Terms &amp; Conditions</Link>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr className="my-4 border-gray-200 sm:mx-auto lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">© 2023 <Link href="/" className="hover:underline">Kats&apos; Web design</Link>. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0 sm:hidden">
              <Link href="#" className="text-gray-500 hover:text-gray-900 ">
              <AiOutlineFacebook size={20}/>
                  <span className="sr-only">Facebook page</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">
              <AiOutlineInstagram size={20}/>
                  <span className="sr-only">Instagram page</span>
              </Link>
          </div>
      </div>
    </div>
</footer>

  )
}

export default Footer