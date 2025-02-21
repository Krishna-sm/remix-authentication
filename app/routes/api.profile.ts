import { ActionFunctionArgs } from "@remix-run/node";
import { UserModel } from "~/models/User";
import { ConnectDB } from "~/utils/database";
import { verifyToken } from "~/utils/JWTAuth";

export const loader=async({request}:ActionFunctionArgs)=>{

try {
    
    const headers= await request.headers.get("authorization") || ''

    if(!headers || !headers.startsWith("Bearer ")){
        throw new Error("unauthorized")
    }
    const token = headers.split(" ")[1]

    const user = verifyToken(token)
   await ConnectDB()

   const check_user = await UserModel.findById(user).select("name email -_id")
   if(!check_user){
    throw new Error("User Not Exists :(")
   }

    return new Response(JSON.stringify(check_user),{
        status:200,
    })
} catch (error:any) {
    return new Response(JSON.stringify({"error":error.message}),{
        status:401,
    })
}
}

export const action = async({request}:ActionFunctionArgs)=>{
    try {
        const headers= await request.headers.get("authorization") || ''

    if(!headers || !headers.startsWith("Bearer ")){
        throw new Error("unauthorized")
    }
    const token = headers.split(" ")[1]

    const user = verifyToken(token)
   await ConnectDB()

   const check_user = await UserModel.findById(user).select("name email -_id")
   if(!check_user){
    throw new Error("User Not Exists :(")
   }        


   const data = await request.json()
   if(!data.name ||!data.email){
       throw new Error("Provide valid name or email For Updating")
   }

   // exist email account

   const checkEmailExistance = await UserModel.findOne({
    email:data.email.toLowerCase()
   })
   if(checkEmailExistance && checkEmailExistance._id.toString()!== user){
       throw new Error("Email already exists with another account !")
   }


   await UserModel.findByIdAndUpdate(user,{
    name:data.name,
    email:data.email.toLowerCase()
   })
   return new Response(JSON.stringify({
    msg:"Profile Update Successfully"
}),{
    status:200
})

    } catch (error:any) {
                return new Response(JSON.stringify({
                    error:error.message
                }),{
                    status:400
                })
    }
}