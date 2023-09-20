import {Request,Response,NextFunction } from "express";
import { CustomRequest } from "./authMiddleware";


export const userISBlock = (req:CustomRequest,res:Response,next:NextFunction)=>{
    try {
        const user = req.user
    } catch (error) {
        
    }
}