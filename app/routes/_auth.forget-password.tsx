import { MetaFunction } from '@remix-run/node';
import { Link, useNavigate } from '@remix-run/react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye ,FaEyeSlash } from "react-icons/fa";
import * as yup from 'yup'
import CustomButton from '~/components/auth/CustomButton';
import { ForgetPassword } from '~/types/auth';
import { axiosClient } from '~/utils/AxiosClient';
export const meta: MetaFunction = () => {
  return [
    { title: "Forget Password" },
    { name: "description", content: "ReAccess Your Account " },
  ];
};

const LoginPage = () => {
 
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const initialValues:ForgetPassword = { 
    email: ''
  }
  const validationSchema = yup.object().shape({ 
    email: yup.string().email('Invalid email format').required('Email is required')
  });
  const onSubmitHandler = async(values:ForgetPassword,helpers:FormikHelpers<ForgetPassword>)=>{
        try {
          setLoading(true)
            const response = await axiosClient.post("/api/forget-password",values)
            const data = await response.data;
      
            
            toast.success(data.msg)
            // window.location.href = data.url
            navigate("/login")


        } catch (error:any) {
          toast.error( error.response.data.error ||error.message)
        }
        finally{
          setLoading(false)

        }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      validationSchema={validationSchema}
    >
      <Form className=' w-full lg:w-1/2 xl:w-1/3  mx-auto bg-white text-black py-10 px-2 rounded-md border border-yellow-400 font-pregular'>
        
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" id="email" className="w-full py-3 px-2 border-b-black border-b  bg-gray-300 outline-none focus:rounded-md focus:bg-gray-200" placeholder="Enter your Email Address" />
            <ErrorMessage name='email' className='text-xs text-red-500' component={'p'} />

          </div>
          
         
           <div className="mb-3">
              <CustomButton type="submit"  text='Send Link' loading={loading} />
           </div>
           <div className="mb-3">
            <p className="text-end">
              Already Know ? <Link to={'/login'} className='font-semibold'>Login </Link>
            </p>
           </div>
    </Form>
    </Formik>
  )
}

export default LoginPage
