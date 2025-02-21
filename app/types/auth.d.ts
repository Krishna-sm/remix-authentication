import React from "react"

export interface RegisterProps{
    name:string 
    email:string 
    password:string
}

export interface UpdateProfileProps{ 
    email:string  
    name:string 

}
export interface ChangePasswordProps{ 
    password:string 
    confirm_password:string

}
export interface UserProps{
    id:string
    email:string
    name:string
}

export interface LoginProps{ 
    email:string 
    password:string
}

export interface ForgetPassword{ 
    email:string
}

export interface ResetPassword extends ChangePasswordProps{ 
 
}
export interface ButtonProps  extends  React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?:boolean,
    text:string 
    className?:string
}