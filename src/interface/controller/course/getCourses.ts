import { Request,Response } from "express";
import { getCourses } from "../../../app/useCase/course/addCourses";
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

