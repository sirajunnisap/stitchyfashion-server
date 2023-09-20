import { Request, Response } from "express";
import { userModel } from "../../../infra/database/model/userModel";
import { User } from "../../../domain/entities/userModel";
import { Admin } from "../../../domain/entities/adminModel";
import { signupUser } from "../../../app/useCase/user/userSignUp"
import userRepositoryImp from "../../../infra/repositories/user/userRepository";
import { AppError } from "../../../utils/errorHandle";
import { adminModel } from "../../../infra/database/model/adminModel";
import nodemailer from "nodemailer";
import * as emailValidator from 'email-validator';

const db = userModel //Instantiate MongoDB connection
const userRepository = userRepositoryImp(db)



export const userSignup =async (req:Request ,res:Response) => {
    try {
        
        const user: User = req.body

        if(!user.name || !user.email || !user.password ||
            /^\s*$/.test(user.name)|| 
            /^\s*$/.test(user.email)|| 
            /^\s*$/.test(user.password)){
                throw new AppError('all field are required',400)
            }
        if(user.password.length<6){
            throw new AppError('password must be at least 6 digits',400)
        }

        console.log(user,'user details');
       
        
        

        const createUser:User = await signupUser(userRepository)(user)
        if(!createUser){
            res.status(500).json({message:'something went wrong'})
        }
        
        if (emailValidator.validate(user.email)) {
            console.log(`${user.email} is a valid email address.`);

            sendVerifyEmail(req.body.name, req.body.email,createUser._id);

          } else {
            console.log(`${user.email} is not a valid email address.`);
          }


        
        
        res.status(200).json({message:'user created successfully'})
    } catch (error:any) {
        
        
        res.status(error.statusCode || 500).json({message:error.message || 'somthing went wrong'})


    }
};

 const sendVerifyEmail = async (name:string, email:string, user_id:string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'sirajunnisap4@gmail.com',
                pass: 'ifqfsqtpuxkghyld'
            }
        });
    
        const mailOptions = {
            from: 'sirajunnisap4@gmail.com',
            to: email,
            subject: 'verification Email',
            html: `<p>Hi ${name}, please click <a href="http://localhost:3000/verifyEmail/${user_id}">here</a> to verify your email.</p>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email has been sent:", info.response);


    } catch (error) {
        console.error("Error sending email:", error);
    }


}


export const verifyEmail = async (req:Request, res:Response)=>{
    try {

        const userId = req.params.id
        console.log(userId,"userid in params");
        
        const updateInfo = await userModel.updateOne({_id:userId},{$set:{isMailVerified:true}})
        if (updateInfo) {
           return res.json({ message: "email verified" ,updateInfo});
        } 

      
    } catch (error) {
        return res.status(500).json({error:'internal server error'})
    }
}

