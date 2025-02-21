import { MetaFunction, useNavigate } from '@remix-run/react';
import React, { useEffect, useState } from 'react'
import ChangePassword from '~/components/Home/ChangePassword';
import ProfileUpdate from '~/components/Home/ProfileUpdate';
import ProfileView from '~/components/Home/ProfileView';
import Loader from '~/components/Loader';
import { useMainContext } from '~/context/MainContext';

export const meta: MetaFunction = () => {
  return [
    { title: "Home Page" },
    { name: "description", content: "Access your Account With Your Token" },
  ];
};
const IndexPage = () => {

  const [index,setIndex] = useState(0)

    const [loading,setLoading] = useState(true)
    const {user}  = useMainContext()
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(!user){ 
      
      navigate("/login")
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
    <>
      <div className="w-full flex min-h-screen justify-center flex-col   items-center py-4 ">
          <div className="w-full  lg:w-1/2">
          <ul className="flex  w-full  items-center mx-auto gap-x-2 py-2">

<li onClick={()=>setIndex(0)} className={` 
  text-xl cursor-pointer font-pregular  px-4 py-2  shadow-md ${index==0?"rounded-md bg-purple-600":"border-purple-500 border-2 text-white"}
  `}>
  Profile
</li>
<li onClick={()=>setIndex(1)} className={` 
  text-xl cursor-pointer font-pregular  px-4 py-2  shadow-md ${index==1?"rounded-md bg-purple-600":"border-purple-500 border-2 text-white"}
  `}>
 Update Profile
</li>
<li onClick={()=>setIndex(2)} className={` 
  text-xl cursor-pointer font-pregular  px-4 py-2  shadow-md ${index==2?"rounded-md bg-purple-600":"border-purple-500 border-2 text-white"}
  `}>
 Change Password
</li>


</ul>
      <div className="w-full">

          {
            index ===0 && <ProfileView/>
          } 
          {
            index ===1 && <ProfileUpdate/>
          }  
           {
            index ===2 && <ChangePassword/>
          }  
          </div>

          </div>
      </div>
    </>
  )
}

export default IndexPage