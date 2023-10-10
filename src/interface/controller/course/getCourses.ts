import { Request,Response } from "express";
import { getCourses, getCoursesByDesignerId } from "../../../app/useCase/course/addCourses";
import { courseModel } from "../../../infra/database/model/courseModel";
import courseRepositoryImp from "../../../infra/repositories/course/courseRepository";
import { AppError } from "../../../utils/errorHandle";

const db = courseModel
const courseRepository = courseRepositoryImp(db)

export const getAllCourses = async(req:Request, res:Response)=>{
    try {
        
        const allCourses=await getCourses(courseRepository)()
        if(!allCourses){
            throw new AppError("something went wrong",400);

        }
        res.status(200).json(allCourses)
        return 
        
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message|| "something went wrong"})
    }
}



export const getDesignerCourses = async(req:Request,res:Response)=>{
    try {
        const designerID = req.params.id as string
        const courses = await getCoursesByDesignerId(courseRepository)(designerID)
            
        res.status(200).json(courses)
        return
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message|| "something went wrong"})
    }
}