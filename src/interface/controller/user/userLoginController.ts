import {Request,Response} from "express";
import { userModel } from "../../../infra/database/model/userModel"; 
import { User } from "../../../domain/entities/userModel";
import { loginGoogle, loginUser } from "../../../app/useCase/user/userLogin"
import userRepositoryImp from "../../../infra/repositories/user/userRepository";
import { signupUser } from "../../../app/useCase/user/userSignUp";
import { AppError } from "../../../utils/errorHandle";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const db = userModel
const userRepository = userRepositoryImp(db)

export type userLogintype = {
    email : string
    password : string
}



export const userLogin = async (req:Request, res:Response)=>{
    try {
        const user:User = req.body

        const {email,password} = user
        if(!email || !password || /^\s*$/.test(email) || /^\s*$/.test(password)){
            throw new AppError ('All fields are required',400)
        }

        const userToken = await loginUser(userRepository)(user)
        
        // console.log(userToken,"userToken in contoller");
        
        res.status(200).json(userToken)


    } catch (error: any) {
        res.status(error.statusCode || 500).json({message:error.message || 'something went wrong'})
    }
}



export const loginWithGoogle =async (req:Request,res:Response)=>{
    try {

        const user :User = req.body
        // console.log(user,"user from body");
        
        // const {name,email,phone} = user
        const token = await loginGoogle(userRepository)(user)
        // console.log(token,"token form google ");
        
        if(token){
            // console.log("loginwithgooglesuccessfull");
            
           
        }
        res.status(200).json(token)
    } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'})
    }
}


export const forgetPassword = async(req:Request,res:Response)=>{
    try {
       const {email} = req.body 
    //    console.log(email,"email for changepassword");

        const user = await userModel.findOne({email})
        // console.log(user,"user for changepassword");
        
        if(!user){
            // console.log("user is not exist ");
            
           
            return res.status(404).json({message:"user not found"})
        }

        if(user.isBlocked === true){
            throw new AppError('your account is suspended', 404);
        }
       let otp = Math.random().toString().substr(-4)
       console.log(otp,"otp");
       sendVerifyEmail(user.email,"Stitchy mail password reset OTP :",otp)
       const addOtpToDb = await userModel.findOneAndUpdate({email},{$set:{otp:otp}},{new:true}) 
       console.log(addOtpToDb,"addotp to database ");
       
       
      return res.status(200).json({message:"an otp has been sent to your account please verify"})
    } catch (error) {
        res.status(500).json({message:"verification faied"})
    }
}


export const verifyOtp = async (req: Request, res: Response) => {
    try {
      const { otp } = req.body;
      console.log(otp, "otp verification");
  
      const userOtp = await userModel.findOne({ otp });
      console.log(userOtp, "user find using otp");
  
      if (userOtp) {
        console.log("User verified");
        const deleteOtp = await userModel.findOneAndUpdate(
          { otp },
          { $set: { otp: '' } },
          { new: true }
        );
        // console.log("OTP deleted", deleteOtp);
  
        if (deleteOtp) {
        //   console.log(deleteOtp._id, "userId");
          return res.status(200).json({ userId: deleteOtp._id });
        } else {
        //   console.log("User not found for the provided OTP");
          return res.status(404).json({ message: "User not found for the provided OTP" });
        }
      } else {
        // console.log("Invalid OTP");
        return res.status(404).json({ message: "Invalid OTP" });
      }
    } catch (error) {
    //   console.error("Error:", error);
      res.status(500).json({ message: "Verification failed" });
    }
  };

export const changePassword = async(req:Request,res:Response)=>{
    try {
        const { password, userId } = req.body;
        // console.log(password, userId, "new password and user id");
    
        // Find the user by their userId
        const findUserById = await userModel.findById(userId);
        // console.log(findUserById, "user for update password");
    
        if (!findUserById) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword, "hashed password for update");
    
        const updatedUser = await userModel.findOneAndUpdate(
          { _id: userId },
          { $set: { password: hashedPassword } },
          { new: true }
        );
    
        // console.log(updatedUser, "updated user");
    
        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({message:"verification failed"})
    }
}





const sendVerifyEmail = async ( email:string,message:string, otp:string) => {
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
            html: `<p>Hi , ${message} <br/> ${otp}</p>`
        };

        const info = await transporter.sendMail(mailOptions);
        // console.log("Email has been sent:", info.response);


    } catch (error) {
        console.error("Error sending email:", error);
    }


}
