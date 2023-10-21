import { Request,Response } from "express";
import { getCourses, getCoursesByDesignerId } from "../../../app/useCase/course/addCourses";
import { courseModel } from "../../../infra/database/model/courseModel";
import courseRepositoryImp from "../../../infra/repositories/course/courseRepository";
import { AppError } from "../../../utils/errorHandle";
import { searchUsecase } from "../../../app/useCase/course/courses";

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

export const searchCourses = async (req: Request, res: Response) => {
    try {
        const searchQuery = req.query.q as string

        console.log(searchQuery,"searching quey form frontend");
        
        const sort = req.query.sort

        console.log(sort,"sorting data from frondent");
        
        let sortCriteria: object = {}
        if (sort === 'name-1') sortCriteria = { name: 1 }
        else if (sort === 'name1') sortCriteria = { name: -1 }
        else sortCriteria = {}

        console.log(sortCriteria,"sortcriteria");
        
        const result = await searchUsecase(courseRepository)(searchQuery, sortCriteria)

        console.log(result,"result");
        
        res.status(200).json(result)

    } catch (error: any) {
        console.log(error)
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}