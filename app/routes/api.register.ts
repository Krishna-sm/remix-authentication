import { ActionFunctionArgs } from "@remix-run/node";
import { UserModel } from "~/models/User";
import { ConnectDB } from "~/utils/database";
import bcrypt from "bcryptjs";

export const loader=()=>{
    ConnectDB()
    return new Response(JSON.stringify({"msg":"api work"}),{
        status:200,
    })
}

export const action=async({request}:ActionFunctionArgs)=>{
            try {
                const data = await request.json();

    if(!data.email || !data.password || !data.name){
        throw new Error("Missing required fields");
    }
           
    const checkUser = await UserModel.findOne({
        email:data.email.toLowerCase()
    })
    
    if(checkUser){
        throw new Error("User already exist");
    }

    const hashpassword = await bcrypt.hash(data.password,10)
          const user=  await UserModel.create({
                name:data.name,
                email:data.email,
                password:hashpassword,
            })


            return new Response(JSON.stringify({msg:"Register successfully",user}),{
                status:201,
            })
            } catch (error:any) {
                return new Response(JSON.stringify({error:error.message}),{
                    status:400,
                })
            }
}