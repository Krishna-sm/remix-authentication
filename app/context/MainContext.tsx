import { useNavigate } from "@remix-run/react";
import React, { createContext, useContext, useState,useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "~/components/Loader";
import { UserProps } from "~/types/auth";
import { ContextProps } from "~/types/mainContext";
import { axiosClient } from "~/utils/AxiosClient";

export const mainContext = createContext<ContextProps>({
    user:null,
    logoutHandler:()=>{},
    fetchUserDetails:()=>{}
});

export const useMainContext =()=> useContext(mainContext);

export const MainContextProvider =({children}:{children:React.ReactNode})=>{
    
    const [user,setUser] = useState<UserProps | null>(null)
    const [loading,setLoading] = useState(true)
    const navigate= useNavigate()
    

    const fetchUserDetails =async()=>{
        try {
            const token = localStorage.getItem("token") || ''
            if(!token) return;

            const response = await axiosClient.get('/api/profile',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const data = await response.data;
            setUser(data);
            


        } catch (error) {
            navigate("/login")
        }finally{
            setLoading(false)
        }
    }


       
        const logoutHandler= ()=>{
            try {
                        setUser(null);

                        localStorage.removeItem("token")
                        navigate("/login")
                        toast.success("Logout Success")
            } catch (error:any) {
                toast.error(error.message)
            }
        }


        const data:ContextProps = {
            user,
            logoutHandler,
            fetchUserDetails
        }


        useEffect(()=>{
            fetchUserDetails()
        },[])

        if(loading){
            return <div className="">
                <Loader/>
            </div>
        }

    return <mainContext.Provider value={data}>
        {children}
    </mainContext.Provider>
}