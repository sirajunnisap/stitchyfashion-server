import { Request,Response } from "express";
import { courseModel } from "../../../infra/database/model/courseModel";
import courseRepositoryImp from "../../../infra/repositories/course/courseRepository";
import { findOneById } from "../../../app/useCase/course/addCourses";


const db = courseModel
const courseRepository = courseRepositoryImp(db)

export const pricing = async(req:Request,res:Response)=>{
    try {
        const courseid = req.params.id

        const course = await findOneById(courseRepository)(courseid)
        console.log(course,"coursedeatils by id");
        
        res.status(200).json(course)
        return
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}