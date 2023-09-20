import { Request,Response } from "express";
import { findOneById, getCourseById, getCourses,  } from "../../../app/useCase/course/addCourses";
import { courseModel } from "../../../infra/database/model/courseModel";
import courseRepositoryImp from "../../../infra/repositories/course/courseRepository";
import { AppError } from "../../../utils/errorHandle";
import { loginAdmin } from "../../../app/useCase/admin/adminLogin";
import { categoryModel } from "../../../infra/database/model/categoryModel";
import categoryRepositoryImp from "../../../infra/repositories/course/categoryRepository";
import { getCategories } from "../../../app/useCase/admin/addCategory";
import { getCoursesByCategoryId } from "../../../app/useCase/course/courses";


const db = courseModel
const courseRepository = courseRepositoryImp(db)

const dbcategory = categoryModel
const categoryRepository = categoryRepositoryImp(dbcategory)



export const getAllCourses = async(req:Request, res:Response)=>{
    try {
        
        const allCourses=await getCourses(courseRepository)()
        console.log(allCourses);
        
        if(!allCourses){
            throw new AppError("something went wrong",400);

        }
        res.status(200).json(allCourses)
        return 
        
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message|| "something went wrong"})
    }
}

export const CourseDetails = async(req:Request,res:Response)=>{
    try {
        

        const courseId:string|undefined = req.params.id as string

        console.log(courseId);
        
        const courseData = await findOneById(courseRepository)(courseId)
        console.log(courseData);
        
        res.status(200).json(courseData)

    } catch (error) {                                                                                                                                               
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}
export const getAllCategories = async(req:Request, res:Response)=>{
    try {
        
        const allCategories=await getCategories(categoryRepository)()
        if(!allCategories){
            throw new AppError("something went wrong",400);

        }
        res.status(200).json(allCategories)
        return 
        
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message|| "something went wrong"})
    }
}

export const CategoryDetails = async(req:Request,res:Response)=>{
    try {
        

        const categoryId:string|undefined = req.params.id as string

        console.log(categoryId,"categorid");
        
        const categoryData = await getCoursesByCategoryId(courseRepository)(categoryId)
        if(!categoryData) throw new AppError("something went wrong",400);

        console.log(categoryData);
        
        res.status(200).json(categoryData)
        return
    } catch (error) {                                                                                                                                               
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}