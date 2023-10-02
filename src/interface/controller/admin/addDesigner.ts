import { Request, Response } from "express";
import { AppError } from "../../../utils/errorHandle";
import nodemailer from "nodemailer";
import * as emailValidator from 'email-validator';
import { designerModel } from "../../../infra/database/model/designerModel";
import designerRepositoryImp from "../../../infra/repositories/designer/designerRepository";
import { Designer } from "../../../domain/entities/designerModel";
import { addDesigner } from "../../../app/useCase/admin/addDesigner";

const db = designerModel //Instantiate MongoDB connection
const designerRepository = designerRepositoryImp(db)



export const designerRegister =async (req:Request ,res:Response) => {
    try {
        
        const designer: Designer = req.body

       

        // console.log(designer,"designer data for adding");
        
        // if(!designer.name || !designer.email ||
        //     /^\s*$/.test(designer.name)|| 
        //     /^\s*$/.test(designer.email)){
        //         throw new AppError('all field are required',400)
        //     }
      

        
        let password = Math.random().toString().substr(-10)

        console.log(password);
        

        const createdDesigner:Designer = await addDesigner(designerRepository)(designer)

        // console.log(createdDesigner,"designer creted");
      
        if(!createdDesigner){
            res.status(500).json({message:'something went wrong'})
        }
         
        const designerEmail = createdDesigner.email
        // console.log(designerEmail,"designer email for creating password");
        
        const addPassword = await designerModel.findOneAndUpdate({email:designerEmail},{$set:{password:password}},{new:true})
        // console.log(addPassword,"password add to the designer data");
        

        if (emailValidator.validate(designer.email)) {
            // console.log(`${designer.email} is a valid email address.`);

            if (addPassword && addPassword.password) {
                sendVerifyEmail(req.body.name, req.body.email, createdDesigner._id, addPassword.password);
              } else {
                console.log('Password not found in addPassword');
                
              }
          } else {
            console.log(`${designer.email} is not a valid email address.`);
          }


        
        
        res.status(200).json({message:'designer created successfully'})
    } catch (error:any) {
        
        
        res.status(error.statusCode || 500).json({message:error.message || 'somthing went wrong'})


    }
};



const sendVerifyEmail = async (name:string, email:string, user_id:string,password:string) => {
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
            subject: 'Verification Email',
            html: `<p>Hi ${name},This is Your password for enter to the StitchY App : ${password} <br>, please click <a href="http://localhost:3000/designer/verifyEmail/${user_id}">here</a> to verify your email.</p>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email has been sent:", info.response);


    } catch (error) {
        console.error("Error sending email:", error);
    }


}


export const verifyEmail = async (req:Request, res:Response)=>{
    try {
        const designerId = req.params.id
        console.log(designerId);
        
        const updateInfo = await designerModel.updateOne({_id:designerId},{$set:{isMailVerified:true}})
        if (updateInfo) {
        return res.json({ message: "email verified" ,updateInfo});
        }

    } catch (error) {
        return res.status(500).json({error:'internal server error'}) 
    }
}

