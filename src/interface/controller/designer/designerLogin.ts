
import { Request,Response } from "express"
import { Designer } from "../../../domain/entities/designerModel"
import { AppError } from "../../../utils/errorHandle"
import { designerModel } from "../../../infra/database/model/designerModel"
import designerRepositoryImp from "../../../infra/repositories/designer/designerRepository"
import { loginDesigner } from "../../../app/useCase/designer/loginDesigner"

const db=designerModel
const designerRepository = designerRepositoryImp(db)

export type designerLoginType = {
    email:string
    password:string
}


export const designerLogin = async(req:Request,res:Response)=>{
    try {
        const designer:Designer = req.body
        // console.log(designer,"designer");
        
        const {email,password} = designer
        if(!email || !password || /^\s*$/.test(email) || /^\s*$/.test(password)){
            throw new AppError ('All fields are required',400)
        }
        
        const designerToken = await loginDesigner(designerRepository)(designer)
        // console.log(designerToken,"designerToken");
        
        res.status(200).json(designerToken)
    } catch (error:any) {
        res.status(error.statusCode || 500).json({message:error.message || "something went wrong"})
    }
}