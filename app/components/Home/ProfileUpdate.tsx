import { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye ,FaEyeSlash } from "react-icons/fa";
import * as yup from 'yup'
import CustomButton from '~/components/auth/CustomButton';
import { useMainContext } from '~/context/MainContext';
import { UpdateProfileProps } from '~/types/auth';
import { axiosClient } from '~/utils/AxiosClient';
const ProfileUpdate = () => { 
  const [loading,setLoading] = useState(false)
  const {user,fetchUserDetails} = useMainContext()


  const initialValues:UpdateProfileProps = {
    name: user && user.name || '',
    email: user && user.email || '',
 
  }
  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
  
  });
  const onSubmitHandler = async(values:UpdateProfileProps,helpers:FormikHelpers<UpdateProfileProps>)=>{
        try {
          setLoading(true)

          const response = await axiosClient.put("/api/profile",values,{
            headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          })
          const data = await response.data;
          await fetchUserDetails()

          toast.success(data.msg)

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
            <label className='text-gray-300' htmlFor="name">Name</label>
            <Field name="name" type="text" id="name" className="w-full py-3 px-2 border-b-black border-b  bg-gray-300 outline-none focus:rounded-md focus:bg-gray-200" placeholder="Enter your name" />
            <ErrorMessage name='name' className='text-xs text-red-500' component={'p'} />
          </div>
          <div className="mb-3">
            <label className='text-gray-300' htmlFor="email">Email</label>
            <Field name="email" type="email" id="email" className="w-full py-3 px-2 border-b-black border-b  bg-gray-300 outline-none focus:rounded-md focus:bg-gray-200" placeholder="Enter your Email Address" />
            <ErrorMessage name='email' className='text-xs text-red-500' component={'p'} />

          </div>
         
           <div className="mb-3">
            <CustomButton text='Update Profile' loading={loading}  />
           </div>
          
    </Form>
    </Formik>
    </div>
  )
}

export default ProfileUpdate