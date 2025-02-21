import { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye ,FaEyeSlash } from "react-icons/fa";
import * as yup from 'yup'
import CustomButton from '~/components/auth/CustomButton';
import { useMainContext } from '~/context/MainContext';
import { ChangePasswordProps } from '~/types/auth';
import { axiosClient } from '~/utils/AxiosClient';
const ChangePassword = () => {
  const [isHide, setIsHide] = React.useState(true);
  const [loading,setLoading] = useState(false)
  const {logoutHandler} = useMainContext()


  const initialValues:ChangePasswordProps = {
    
    password: '',
    confirm_password:''
  }
  const validationSchema = yup.object().shape({ 
    password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
    confirm_password: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match').required('Confirm Password is required'),
  });
  const onSubmitHandler = async(values:ChangePasswordProps,helpers:FormikHelpers<ChangePasswordProps>)=>{
        try {
          setLoading(true)

          const response = await axiosClient.patch('/api/change-password',values,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })  
          const data = await response.data;
          toast.success(data.msg)

          logoutHandler()


        } catch (error:any) {
          toast.error( error.response.data.error ||error.message)
        }finally{
          setLoading(false)
        }
  }

  return (
    <div className='bg-white/5 py-10 px-2 xl:py-10'>

<Formik
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      validationSchema={validationSchema}
    >
      <Form className='  mx-auto   text-black py-10 px-2 rounded-md  font-pregular'>
          <div className="mb-3">
                     <label className='text-gray-300' htmlFor="password">Password</label>
                    <div className="flex items-center gap-x-2 border-b-black border-b  bg-gray-300 outline-none focus:rounded-md focus:bg-gray-200 px-3">
                    <Field name="password" type={isHide?"password":"text"} id="password" className="w-full py-3 px-2  bg-transparent outline-none border-none" placeholder="Enter your Password" />
                     <button type='button' className='text-xl' onClick={() => setIsHide(!isHide)}>{isHide? <FaEye /> : <FaEyeSlash />}</button>
                    </div>
                    <ErrorMessage name='password' className='text-xs text-red-500' component={'p'} />
         
                   </div>
           <div className="mb-3">
                      <label className='text-gray-300' htmlFor="confirm_password">Confirm Password</label>
                     <div className="flex items-center gap-x-2 border-b-black border-b  bg-gray-300 outline-none focus:rounded-md focus:bg-gray-200 px-3">
                     <Field name="confirm_password" type={isHide?"password":"text"} id="password" className="w-full py-3 px-2  bg-transparent outline-none border-none" placeholder="Re Enter Your Password" />
                      <button type='button' className='text-xl' onClick={() => setIsHide(!isHide)}>{isHide? <FaEye /> : <FaEyeSlash />}</button>
                     </div>
                     <ErrorMessage name='confirm_password' className='text-xs text-red-500' component={'p'} />
          
                    </div>
         
           <div className="mb-3">
            <CustomButton text='Update Profile' loading={loading}  />
           </div>
          
    </Form>
    </Formik>
    </div>
  )
}

export default ChangePassword