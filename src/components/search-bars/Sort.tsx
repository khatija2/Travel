import React, {useState} from 'react'
import useOnClickOutside from "~/hooks/closeModal"
import {RiArrowDownSLine} from 'react-icons/ri'

type sortProps = {

  onClickAscending: () => void;
  onClickDescending: () => void;
  onClickNewest: () => void;
  onClickOldest: () => void;

}


const Sort:React.FC<sortProps> = ({onClickAscending, onClickDescending, onClickNewest, onClickOldest}) => {

  const [showSortList, setShowSortList] = useState(false);

  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
      
     useOnClickOutside(ref, () => setShowSortList(false));

     const handleAscending = () => {
     onClickAscending()
     setShowSortList(false)
     }

     const handleDescending = () => {
          onClickDescending()
          setShowSortList(false)
          }

     const handleNewest = () => {
          onClickNewest()
          setShowSortList(false)
          }

     const handleOldest = () => {
          onClickOldest()
          setShowSortList(false)
          }

  return (

    <div className="flex items-center justify-center sm:justify-end sm:px-6 lg:pr-28 w-full">      
    <button onClick={() => (setShowSortList(true))} className="rounded-lg text-sm text-gray-900 px-4 py-2.5 flex justify-between items-center border border-gray-300 w-3/4 sm:w-1/3 lg:w-1/4 my-4 sm:my-8" type="button">Sort by: Most Relevent<RiArrowDownSLine size={18}/></button>
    <span className="sr-only">Dropdown menu</span>
   {showSortList && (<> 
    <div className="z-20 w-full absolute translate-y-24 pt-6 flex justify-center sm:justify-end" ref={ref}>
         <div className=" bg-white rounded-lg shadow text-gray-900 w-3/4 sm:w-1/4 lg:w-1/5">
            <ul className="py-2 text-sm text-gray-700 cursor-pointer">
                <li>
                     <span onClick={handleAscending} className="flex px-4 py-2 hover:bg-gray-100">Price - Low to High</span>
                </li>
                <li>
                     <span onClick={handleDescending}  className="flex px-4 py-2 hover:bg-gray-100">Price - High to Low</span>
                </li>
                <li>
                     <span onClick={handleNewest}  className="flex px-4 py-2 hover:bg-gray-100">Newest</span>
                </li>
                <li>
                     <span onClick={handleOldest} className="flex px-4 py-2 hover:bg-gray-100">Oldest</span>
                 </li>
            </ul>
         </div>
    </div> </>)}
  </div>
  )
}

export default Sort