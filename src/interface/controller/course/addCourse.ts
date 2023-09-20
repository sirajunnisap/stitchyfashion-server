import {  courseAdding,getCourseById,getCourses,CourseUnlist,updateCourse, getCoursesByDesignerId, findOneById, addClassUseCase} from "../../../app/useCase/course/addCourses";
import { Course } from "../../../domain/entities/courseModel";
import { courseModel } from "../../../infra/database/model/courseModel";
import  courseRepositoryImp  from "../../../infra/repositories/course/courseRepository";
import { Request,Response } from "express";
import { AppError } from "../../../utils/errorHandle";
import { CustomRequest } from "../../middleware/authMiddleware";
import { categoryModel } from "../../../infra/database/model/categoryModel";

const db = courseModel 
const courseRepository = courseRepositoryImp(db)

export type CourseAddType = {
    title : string,
    description : string,
    designer : string,
    duration : number,    
    level:string,         
    courseFee:number,
    category:string,
    image:string
}

export const addCourse = async(req:CustomRequest,res:Response)=>{
    try {
       
        
        const designerId = req.user?.designer._id
        console.log(designerId,"designerid");
        
        const {title,description,duration,category,level,courseFee} = req.body
        console.log(category,"categorydetail");
        
        const categoryObj = await categoryModel.findOne({name:category});

        const courseData = req.body
        console.log(courseData,"course data for add");
        courseData.designer = designerId
        courseData.category = categoryObj

        console.log(courseData,"courseData for adding");
        
        const addedCourse:Course = await courseAdding(courseRepository)(courseData)
        if(!addedCourse){
            res.status(500).json({message:"something went wrong"})
        }
         
        
        res.status(200).json({message:"course created successfully"})
    } catch (error:any) {
       res.status(error.statusCode || 500).json({message:error.message || "somthing went wrong"}) 
    }
    
}


export const addClasses =async(req:Request,res:Response)=>{
    try {

        console.log(req.body,"body data");
    
        const classData= req.body
    
        const addedClass = await addClassUseCase(courseRepository)(classData)
        if(!addedClass){
            res.status(500).json({message:"something went wrong"})
        }
        
        res.status(200).json({message:"class added successfully"})
    } catch (error:any) {
        res.status(error.statusCode || 500).json({message:error.message || "something went wrong"})
    }
   

}

export const getAllClasses = async(req:Request,res:Response)=>{

}

export const CourseDetails = async(req:CustomRequest,res:Response)=>{
    try {
        

        const courseId:string|undefined = req.params.id as string

        const courseData = await findOneById(courseRepository)(courseId)
        console.log(courseData,"courseDetails ");
        
        res.status(200).json(courseData)

    } catch (error) {                                                                                                                                               
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export const AllCourses = async(req:CustomRequest,res:Response)=>{
    try {

        const designerId = req.user?.designer._id

        const allCourses = await getCoursesByDesignerId(courseRepository)(designerId)
        if(!allCourses) throw new AppError("something went wrong",400);

        res.status(200).json(allCourses)
        return

    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message|| "something went wrong"})
    }
}

export const courseUpdate = async (req: Request, res: Response) => {
    try {
      const CourseData = req.body;
      const courseId = req.params.id; 
  console.log(CourseData,courseId,"courseupdate datas");
  
      const courseData: object = {
        title: CourseData.title as string,
        description: CourseData.description as string,
        designer: CourseData.designer as string,
        duration: CourseData.duration as number,
        level: CourseData.level as string,
        courseFee: CourseData.courseFee as number,
        image: CourseData.image as string,
        unlist: CourseData.unlist as boolean,
        classes: CourseData.classes as Array<{}>,
      };
  
      const updatedCourse = await updateCourse(courseRepository)(courseId, courseData);
      if (updatedCourse) {
        res.status(200).json(updatedCourse);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message || "something went wrong" });
    }
  };


export const courseUnlist = async(req:Request,res:Response)=>{
    try {
        const courseId = req.query.id as string
        const action  = req.query.action as string

        if(!courseId || !action)throw new AppError("not found",404)

        const unlistedCourse = await CourseUnlist(courseRepository)(courseId,action)
        if(unlistedCourse === null)throw new AppError("something went wrong while fetch the course",500)
        if(unlistedCourse === true) {
            res.status(200).json({message:"course unlisted successfully"})
            return
        }else if(unlistedCourse === false){
            res.status(200).json({message:"course list successfully"})
            return
        }
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message|| "something went wrong"})
    }
}


