import { courseRepository } from "../../../infra/repositories/course/courseRepository";

export const getCoursesByCategoryId =(courseRepository:courseRepository)=>
    async(categoryId:string):Promise<object|null>=>{
        // console.log(categoryId,"useCasecategoryID");
        
        const courses = await courseRepository.getAllCoursesByCategoryId(categoryId)
        return courses
    }

    export const searchUsecase = (courseRepository:courseRepository)=>
  async(searchQuery:string,sortCriteria:{}):Promise<object[]|null>=>{
    const course= await courseRepository.searchCourse(searchQuery,sortCriteria)
    return course
  }

export const getCourseforDashUse = (courseRepository:courseRepository)=>
async():Promise<any|null>=>{
    const course = await courseRepository.getAllCoursesByCategory()
    return course
}