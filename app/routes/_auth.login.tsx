import { MetaFunction } from '@remix-run/node';
import { Link, useNavigate } from '@remix-run/react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye ,FaEyeSlash } from "react-icons/fa";
import * as yup from 'yup'
import CustomButton from '~/components/auth/CustomButton';
import { useMainContext } from '~/context/MainContext';
import { LoginProps } from '~/types/auth';
import { axiosClient } from '~/utils/AxiosClient';


export const meta: MetaFunction = () => {
  return [
    { title: "Login Page" },
    { name: "description", content: "Login In Your  Account with Valid Credentials " },
  ];
};

const LoginPage = () => {

  const [isHide, setIsHide] = React.useState(true);
  const [loading,setLoading] = useState(false)
  const {fetchUserDetails} = useMainContext()
const navigate = useNavigate()
  const initialValues:LoginProps = { 
    email: '',
    password: '',
  }
  const validationSchema = yup.object().shape({ 
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
  });
  const onSubmitHandler = async(values:LoginProps,helpers:FormikHelpers<LoginProps>)=>{
        try {
          setLoading(true)
          const response = await axiosClient.post('/api/login',values)
          const data = await response.data;
          
          localStorage.setItem('token', data.token)
          await fetchUserDetails()
          
          toast.success(data.msg)
          navigate("/")
        } catch (error:any) {
          toast.error( error.response.data.error ||error.message)
        }finally{
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
            <label htmlFor="password">Password</label>
           <div className="flex items-center gap-x-2 border-b-black border-b  bg-gray-300 outline-none focus:rounded-md focus:bg-gray-200 px-3">
           <Field name="password" type={isHide?"password":"text"} id="password" className="w-full py-3 px-2  bg-transparent outline-none border-none" placeholder="Enter your Password" />
            <button type='button' className='text-xl' onClick={() => setIsHide(!isHide)}>{isHide? <FaEye /> : <FaEyeSlash />}</button>
           </div>
           <ErrorMessage name='password' className='text-xs text-red-500' component={'p'} />

          </div>
          <div className="mb-3">
            <p className="text-end">
              <Link to={'/forget-password'} className='font-pregular'>Forget Password ? </Link>
            </p>
           </div>
           <div className="mb-3">
              <CustomButton type="submit"  text='Login' loading={loading} />
           </div>
           <div className="mb-3">
            <p className="text-end">
              Dont Have An Account ? <Link to={'/register'} className='font-semibold'>Register </Link>
            </p>
           </div>
    </Form>
    </Formik>
  )
}

export default LoginPage
