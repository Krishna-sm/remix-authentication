import { Outlet, useNavigate } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import Loader from '~/components/Loader'
import { useMainContext } from '~/context/MainContext'

const AuthRoute = () => {

  const [loading,setLoading] = useState(true)
  const {user}  = useMainContext()
const navigate = useNavigate()

useEffect(()=>{
  if(user && user.name){ 
    
    navigate("/")
    return
  }else{
    setLoading(false)
  }
},[user])

  if(loading){
    return <div className='min-h-screen w-full flex items-center justify-center'>
      <Loader/>
    </div>
  }

 

  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <Outlet/>
    </div>
  )
}

export default AuthRoute
