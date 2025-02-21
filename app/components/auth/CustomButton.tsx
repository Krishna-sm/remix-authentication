import React from 'react'
import { ButtonProps } from '~/types/auth'
import { CgSpinner } from "react-icons/cg";
import { FaArrowRight } from 'react-icons/fa';



const CustomButton = ({loading,className,text,...props}:ButtonProps) => {
  return (
    <>
              <button {...props} disabled={loading}  className={` 
                w-full py-3 rounded-md bg-black disabled:bg-slate-950 text-white flex items-center justify-center gap-x-2 ${className}
                `}> <span>{text} </span>
                   {loading? <CgSpinner className='text-white animate-spin text-xl' />:
                   <FaArrowRight className='text-white text-xl' />
                   }
                </button>
    </>
  )
}

export default CustomButton