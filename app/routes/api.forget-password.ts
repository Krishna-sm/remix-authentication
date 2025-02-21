import { ActionFunctionArgs } from "@remix-run/node";
import { UserModel } from "~/models/User";
import { ConnectDB } from "~/utils/database";
import { generateToken } from "~/utils/JWTEmail";
import { SendEmail } from "~/utils/NodeMailerEmail";

export const action = async({request}:ActionFunctionArgs)=>{
    try {

        const data = await request.json()
        if(!data.email){
            throw new Error("Enter valid Email")
        }

          await  ConnectDB();
        const check_user = await UserModel.findOne({
            email:data.email.toLowerCase()
        })
        if(!check_user){
            throw new Error("Account Not Found , Try To register with this email Account :)")
        }

        // token 

        const token = await generateToken(check_user._id);
        // , email

        const url = `${process.env.FRONTEND_URI}/reset-password?token=`+token

       const re= await SendEmail(check_user.email,url)
         
            

        return new Response(JSON.stringify({
            msg:"Link Send Successfully"
        }),{
            status:200
        })

    } catch (error:any) {
        console.log(error);
        
        return new Response(JSON.stringify({
            error:error.message
        }),{
            status:400
        })
    }
}