// const nodemailer = require("nodemailer");

import nodemailer from "nodemailer";

export const SendEmail = async(to:string,token:string)=>{
    const transporter = nodemailer.createTransport({
       //@ts-ignore 
      host: process.env.SMTP_HOST!,
      port: process.env.SMTP_PORT!,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.SMTP_AUTHUSER!,
        pass: process.env.SMTP_AUTHPASSWORD!,
      },
    });
    const info = await transporter.sendMail({
        from: '"Krishna 👻" <codewithkrishna@gmail.com>', // sender address
        to: to, // list of receivers
        subject: "Password Reset ✔", // Subject line 
        html: `
                <a href="${token}">Reset Link</a>
        `, // html body
      });
      return info;
}