import {Request , Response} from "express" ;
import { Admin } from "../../../domain/entities/adminModel";
import { adminModel } from "../../../infra/database/model/adminModel";
import adminRepositoryImp from "../../../infra/repositories/admin/adminRepository";
import { AppError } from "../../../utils/errorHandle";
import { loginAdmin } from "../../../app/useCase/admin/adminLogin";
import { getUserById, getUsers } from "../../../app/useCase/admin/getUsers";
import userRepositoryImp, { userRepository } from "../../../infra/repositories/user/userRepository";
import { userModel } from "../../../infra/database/model/userModel";

const db = adminModel
const adminRepository = adminRepositoryImp(db)

const dbuser = userModel
const userRepository = userRepositoryImp(dbuser)


export type adminLoginType = {
    email:string
    password:string
}
export const adminLogin = async (req:Request,res:Response)=>{
 
    try {
        const admin:Admin = req.body
        console.log(admin,"admin");
        
        const {email,password} = admin
        if(!email || !password || /^\s*$/.test(email) || /^\s*$/.test(password)){
            throw new AppError ('All fields are required',400)
        }
    
        const adminToken =  await loginAdmin(adminRepository)(admin)
        console.log(adminToken,"admintoken");
        
        res.status(200).json(adminToken)
    
    } catch (error:any) {
        res.status(error.statusCode || 500).json({message:error.message || "something went wrong"})
    }
   
    
}




