import React from 'react'
import {RiArrowDownSLine} from 'react-icons/ri'
import {MdOutlineAttachMoney} from 'react-icons/md'
import useOnClickOutside from "~/hooks/closeModal"

type budgetProps = {
  closeBudgetModal: () => void
  onBudgetSelected: (item: string) => void;
}

const Budget:React.FC<budgetProps> = ({closeBudgetModal, onBudgetSelected}) => {

const budget = ["Less than R5000", "R5000-10000", "R10000-20000", "R20000-30000", "R30000-R50000"]

  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  useOnClickOutside(ref, () => closeBudgetModal());

  const handleItemClick = (item: string) => {
    onBudgetSelected(item);
    closeBudgetModal()
  };

  const handleClearFilter = (event: any) => {
    onBudgetSelected("None")
    closeBudgetModal()
  };
  


  return (
    <div className="absolute z-50 w-full items-center justify-center  max-h-full translate-y-4 lg:translate-y-24 flex">
    <div ref={ref} className="relative w-4/5 lg:w-2/5 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center py-4 lg:pt-6 lg:pb-7 border-b">
        <div  className="flex flex-row justify-between no-wrap items-center rounded-md h-10 sm:h-14 w-full sm:w-3/4 lg:w-5/8 2xl:w-3/5 mx-3  sm:w-120 border border-black p-2 sm:p-4">
          <div className="flex items-center gap-1 "><MdOutlineAttachMoney size={20}/><p>Budget</p></div>
          <span className="sr-only">Select a budget category</span>
          <span><RiArrowDownSLine size={20}/></span>
          </div>
        </div>
     <div className="sm:pl-2 pb-2">
      <h3 className=" text-gray-500 dark:text-white hover:bg-gray-100 px-3 py-2" onClick={handleClearFilter}>None</h3>
      {budget.map((item, index) => ( 
        <div className="px-3 pb-1 hover:bg-gray-100 cursor-pointer" key={index} onClick={() => handleItemClick(item)}>
           {item}
        </div>
        ))}
     </div>
    </div>
  </div>
  )
}

export default Budget