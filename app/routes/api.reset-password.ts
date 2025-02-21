import { ActionFunctionArgs } from "@remix-run/node";
import { UserModel } from "~/models/User";
import { ConnectDB } from "~/utils/database";
import { verifyToken } from "~/utils/JWTEmail";
import bcrypt from 'bcryptjs'
export const action = async({request}:ActionFunctionArgs)=>{
    try {

                const headers= await request.headers.get("reset-token") || ''
        
            if(!headers || !headers.startsWith("Bearer ")){
                throw new Error("Invalid Token")
            }
            const token = headers.split(" ")[1]
        
            const user = verifyToken(token)
           await ConnectDB()
        
           const check_user = await UserModel.findById(user)
           if(!check_user){
            throw new Error("User Not Exists :(")
           }    
           
           const data = await request.json()
           if(!data.password || !data.confirm_password){
            throw new Error("Enter Valid Details");
           }

           const hash_password = await bcrypt.hash(data.password,10)

           await UserModel.findByIdAndUpdate(user,{
            password:hash_password
           })

           return new Response(JSON.stringify({"msg":"Password Reset Successfully"}),{
            status:200,
        })



    } catch (error:any) { 
        return new Response(JSON.stringify({"error":error.message}),{
            status:500,
        })
    }
}