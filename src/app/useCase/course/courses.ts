import { courseRepository } from "../../../infra/repositories/course/courseRepository";

export const getCoursesByCategoryId =(courseRepository:courseRepository)=>
    async(categoryId:string):Promise<object|null>=>{
        console.log(categoryId,"useCasecategoryID");
        
        const courses = await courseRepository.getAllCoursesByCategoryId(categoryId)
        return courses
    }
