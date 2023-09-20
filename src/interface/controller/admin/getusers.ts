import { Request,Response } from "express";
import { getUsers, isBlockUser } from "../../../app/useCase/admin/getUsers";
import { AppError } from "../../../utils/errorHandle";
import { userModel } from "../../../infra/database/model/userModel";
import userRepositoryImp from "../../../infra/repositories/user/userRepository";
import { User } from "../../../domain/entities/userModel";
const db = userModel
const userRepository = userRepositoryImp(db)
interface UserData {
    _id:string
    name: string
    email: string
    phone: number
    password: string
    isMailVerified: boolean
    isBlocked: boolean
}
export const getAllUsers = async(req:Request, res:Response)=>{
    try {
        const allUsers=await getUsers(userRepository)()
        if(!allUsers){
            throw new AppError("something went wrong",400);

        }
        res.status(200).json(allUsers)
        return 
        
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message|| "something went wrong"})
    }
}



export const blockUser = async(req:Request,res:Response)=>{
    try {

        const {userId,action} = req.body
        console.log(userId,action,"userid action");
        
        if(!userId || !action)throw new AppError("not found",404)

        const blockedUser = await isBlockUser(userRepository)(userId,action)
        if(blockedUser === null)throw new AppError("something went wrong while fetch the user",500)
        if(blockedUser === true) {
            res.status(200).json({message:"user blocked successfully"})
            return
        }else if(blockedUser === false){
            res.status(200).json({message:"user unblocked successfully"})
            return
        }
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message|| "something went wrong"})
    }
}
