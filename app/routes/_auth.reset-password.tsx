import { MetaFunction } from '@remix-run/node';
import { Link, useNavigate, useSearchParams } from '@remix-run/react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye ,FaEyeSlash } from "react-icons/fa";
import * as yup from 'yup'
import CustomButton from '~/components/auth/CustomButton';
import Loader from '~/components/Loader';
import { ResetPassword } from '~/types/auth';
import { axiosClient } from '~/utils/AxiosClient';
export const meta: MetaFunction = () => {
  return [
    { title: "Reset Password" },
    { name: "description", content: "Access Again Your Account " },
  ];
};

const LoginPage = () => {
 
  const [loading,setLoading] = useState(false)
  const [isHide, setIsHide] = React.useState(true);
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [loader,setLoader] = useState(true) 

  

  const initialValues:ResetPassword = { 
    password: '',
    confirm_password: '',
  }
  const validationSchema = yup.object().shape({ 

    password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
    confirm_password: yup.string().oneOf([yup.ref('password'), ''], 'Confirm Password must match Password'), 
  });
  const onSubmitHandler = async(values:ResetPassword,helpers:FormikHelpers<ResetPassword>)=>{
        try {
          const response = await axiosClient.put("/api/reset-password",values,{
            headers: {
              'reset-token': `Bearer ${searchParams.get("token")}`
            }
          })
          const data = await response.data;
          toast.success(data.msg)
          navigate("/login")
    
        } catch (error:any) {
          toast.error(  error.response.data.error ||error.message)
        }
  }


  useEffect(()=>{
    if(!searchParams.get("token")){
      navigate("/login")
    }else{
      setLoader(false)
    }
  },[])

  if(loader){
    return <div className="min-h-screen flex items-center justify-center">
      <Loader/>
    </div>
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      validationSchema={validationSchema}
    >
      <Form className=' w-full lg:w-1/2 xl:w-1/3  mx-auto bg-white text-black py-10 px-2 rounded-md border border-yellow-400 font-pregular'>
        
               <div className="mb-3">
                               <label className='text-gray-950' htmlFor="password">Password</label>
                              <div className="flex items-center gap-x-2 border-b-black border-b  bg-gray-300 outline-none focus:rounded-md focus:bg-gray-200 px-3">
                              <Field name="password" type={isHide?"password":"text"} id="password" className="w-full py-3 px-2  bg-transparent outline-none border-none" placeholder="Enter your Password" />
                               <button type='button' className='text-xl' onClick={() => setIsHide(!isHide)}>{isHide? <FaEye /> : <FaEyeSlash />}</button>
                              </div>
                              <ErrorMessage name='password' className='text-xs text-red-500' component={'p'} />
                   
                             </div>
                     <div className="mb-3">
                                <label className='text-gray-950' htmlFor="confirm_password">Confirm Password</label>
                               <div className="flex items-center gap-x-2 border-b-black border-b  bg-gray-300 outline-none focus:rounded-md focus:bg-gray-200 px-3">
                               <Field name="confirm_password" type={isHide?"password":"text"} id="password" className="w-full py-3 px-2  bg-transparent outline-none border-none" placeholder="Re Enter Your Password" />
                                <button type='button' className='text-xl' onClick={() => setIsHide(!isHide)}>{isHide? <FaEye /> : <FaEyeSlash />}</button>
                               </div>
                               <ErrorMessage name='confirm_password' className='text-xs text-red-500' component={'p'} />
                    
                              </div>
          
         
           <div className="mb-3">
              <CustomButton type="submit"  text='update Password' loading={loading} />
           </div>
        
    </Form>
    </Formik>
  )
}

export default LoginPage
