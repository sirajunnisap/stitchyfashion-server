import { courseRepository } from "../../../infra/repositories/course/courseRepository";
import { Classes, Course } from "../../../domain/entities/courseModel";
import { AppError } from "../../../utils/errorHandle";



export const courseAdding = (courseRepository:courseRepository)=>{
    return async(course:Course):Promise<Course>=>{

        const isCourseExist = await courseRepository.findCourseByTitle(course.title)
        if(isCourseExist){

            throw new AppError('course is already Exist',409)
        }else{
            const addedCourse = await courseRepository.addCourse(course)
        return addedCourse
        }
        
    }
    
}
export const addClassUseCase = (courseRepository:courseRepository)=>{
    return async(classes:Classes):Promise<Course|null>=>{

        
        const isClassExist = await courseRepository.findClassByTitle(classes.title)
        // console.log(isClassExist,"class already exist");
        
        if(isClassExist){
            throw new AppError('class is already exist',409)
        }
        const addClass = await courseRepository.addingClass(classes)
        return addClass
    }
}

export const getCoursesByDesignerId = (courseRepository:courseRepository)=>
     async(designerId:string):Promise<object|null>=>{
        const  courses = await courseRepository.getAllCoursesById(designerId)
        return courses
    }

export const getCourses = (courseRepository:courseRepository)=>
    async():Promise<object|null>=>{
        const  courses = await courseRepository.getAllCourses()
        return courses
}

export const getCourseById = (courseRepository:courseRepository)=>{
    
    return async(courseId:string):Promise<object|null>=>{

        const course = await courseRepository.findCourseById(courseId);
        return course
    }
}

export const findOneById:any = (courseRepository:courseRepository)=>{
    
    return async(courseId:string):Promise<object|null>=>{

        const course = await courseRepository.findOneCourse(courseId);
        
        return course
    }
}

export const updateCourse = (courseRepository:courseRepository)=>{
    return async(courseId:string,courseDetails:object):Promise<object|null>=>{

        const course:object|null = await courseRepository.updateCourseById(courseId,courseDetails)
        return course
    }
}

export const CourseUnlist = (courseRepository:courseRepository)=>{
    return async(courseId:string,action:string):Promise<Boolean|undefined>=>{
        const course = await courseRepository.unlistCourse(courseId,action);
       return course
    }

}
     