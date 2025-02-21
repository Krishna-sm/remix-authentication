import { ActionFunctionArgs } from "@remix-run/node";
import { UserModel } from "~/models/User";
import { ConnectDB } from "~/utils/database";
import { verifyToken } from "~/utils/JWTAuth";
import bcrypt from "bcryptjs";
export const action = async({request}:ActionFunctionArgs)=>{
    try {

          const headers= await request.headers.get("authorization") || ''
        
            if(!headers || !headers.startsWith("Bearer ")){
                throw new Error("unauthorized")
            }
            const token = headers.split(" ")[1]
        
            const user = verifyToken(token)
           await ConnectDB()
        
           const check_user = await UserModel.findById(user)
           if(!check_user){
            throw new Error("User Not Exists :(")
           }   
           
           const data = await request.json()

           if(!data.password || !data.confirm_password ){
            throw new Error("Invalid Passwor");
           }
           if(data.password !==  data.confirm_password){
            throw new Error("Passwords does not match with confirm password");
           }

           const checkExistPassword = await bcrypt.compare(data.password ,check_user.password)
           if(checkExistPassword){
            throw new Error("Password already in Use");
           }
           const hashPassword = await bcrypt.hash(data.password,10)
            await UserModel.findByIdAndUpdate(user,{password:hashPassword})
            return new Response(JSON.stringify({msg:"Password updated successfully"}),{
                status:200
            })




    } catch (error:any) {
        return new Response(JSON.stringify({
            error: error.message
        }),{
            status:400
        })
    }
}