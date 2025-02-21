import { ActionFunctionArgs } from "@remix-run/node";
import { UserModel } from "~/models/User";
import bcrypt  from 'bcryptjs'
import { ConnectDB } from "~/utils/database";
import { generateToken } from "~/utils/JWTAuth";




export const action=async({request}:ActionFunctionArgs)=>{
    try {
            ConnectDB()
        const data = await request.json();
        if(!data.email || !data.password){
            throw new Error("Enter valid Credentials");
        }
        // user existance

        const check_user = await UserModel.findOne({email:data.email.toLowerCase()})
        if(!check_user){
            throw new Error("Invalid Account :(");

        }
        const isMatch =await bcrypt.compare(data.password,check_user.password)
        if(!isMatch){
            throw new Error("Invalid Credentials :(")
        }
        //generate token
        const token = generateToken(check_user._id)



        return new Response(JSON.stringify({
            msg:"Login successfully",
            token:token
        }),{
            status:200
        })


    } catch (error:any) {
       return  new Response(JSON.stringify({
            error:error.message
        }),{
            status:400
        })
    }
}