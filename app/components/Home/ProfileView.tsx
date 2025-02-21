import React from 'react'
import { useMainContext } from '~/context/MainContext'

const ProfileView = () => {
  const {user,logoutHandler} = useMainContext()
  return (
    <>
                <div className="w-full bg-white/5 py-10 my-3 rounded-md shadow-lg px-3 xl:px-10">
                  <p className='text-xl font-psmbold '>Name: <span className='font-pregular'>{user && user.name}</span>  </p>

                  <p className='text-xl font-psmbold '>Email: <span className='font-pregular'>{ user && user.email}</span>  </p>
                  <div className="my-3">
                  <button onClick={logoutHandler} className='px-5 rounded-md py-2 bg-red-500 text-white'>Logout</button>
                  </div>

                </div>
    </>
  )
}

export default ProfileView