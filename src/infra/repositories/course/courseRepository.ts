import { Classes, Course } from "../../../domain/entities/courseModel";
import { CourseAddType } from "../../../interface/controller/course/addCourse";
import { AppError } from "../../../utils/errorHandle";
import { MongoDBCourse, courseModel } from "../../database/model/courseModel";


export type courseRepository = {
    addCourse:(course:Course)=>Promise<Course>;
    findCourseByTitle:(title:string)=>Promise<Course|null>
    findCourseById:(id:string)=>Promise<Course>;
    getAllCoursesById:(designerId:string)=>Promise<object[]|null>;
    getAllCourses:()=>Promise<object[]|null>
    updateCourseById:(id:string,CourseDetails:object)=>Promise<object|null>
    unlistCourse:(id:string,action:string)=>Promise<Boolean|undefined>
    findOneCourse:(id:string)=>Promise<Course>;
    addingClass:(classData:Classes)=>Promise<Course>
    getAllCoursesByCategoryId:(categoryId:string)=>Promise<object[]|null>;
    findClassByTitle:(title:string)=>Promise<Classes|null>
}


const courseRepositoryImp = (courseModel: MongoDBCourse): courseRepository=>{

    const addCourse = async (course:Course):Promise<Course>=>{
            // console.log(course,"course DAta in repositery");
            
        try {
            const addedCourse = await courseModel.create(course);
            // console.log('Added course:', addedCourse);
    
            return addedCourse;
        } catch (error) {
            console.error('Error adding course:', error);
            throw error;
        }
    }

    const addingClass = async(classData:Classes):Promise<Course>=>{
      
      const courseId = classData._id
      // console.log(courseId,"courseid");
      const  {title,description,video} = classData

      const newClass = {
        title,description,video
      }
      // console.log(newClass,"new class");
      
      const findCourse= await courseModel.findById({_id:courseId})
      if(!findCourse){
       throw new AppError('error ',404)
      }
      // console.log(findCourse,"findCourse by id ");
      
      findCourse.classes.push(newClass)
                           
    const updateCourse = await findCourse.save()
    // console.log(updateCourse,"upadate adddddddddd class to course");
    
      

      return updateCourse
    }


    const findCourseByTitle = async (title: string): Promise<Course | null> => {
        const course = await courseModel.findOne({ title });
        return course;
      };
      const findClassByTitle = async (title: string): Promise<Classes | null> => {
        try {
          const course = await courseModel.findOne({
            "classes.title": title // Use $elemMatch to find a class with the specified title
          });
      
          if (course) {
            const foundClass = course.classes.find((cls) => cls.title === title);
            return foundClass || null; 
          }
      
          return course
        } catch (error) {
          console.error(error);
          return null;
        }
      };
      const findCourseById = async (courseId: string): Promise<any> => {
        const course = await courseModel
          .findById(courseId)
          .populate("designer") 
          .exec(); 
      
          // console.log(course,"course data in");
          
        return course;
      };
      const findOneCourse = async (courseId: string): Promise<any> => {
        const course = await courseModel.findById(courseId)
          
      
          // console.log(course,"course data in");
          
        return course;
      };

      const getAllCoursesById = async (designerId: string): Promise<Course[]> => {
        const allCourses: Course[] = await courseModel.find({ designer: designerId });
        if(!allCourses)throw new AppError('Somthing went wrong ',500)
        if (allCourses.length === 0) {
            throw new AppError('No courses found for the designer', 404);
          }
        return allCourses
    }
  const getAllCoursesByCategoryId = async(categoryId:string):Promise<Course[]> =>{
    const allCourses:Course[] = await courseModel.find({category:categoryId});
    if(!allCourses)throw new AppError('Somthing went wrong ',500)
    if (allCourses.length === 0) {
        throw new AppError('No courses found for the designer', 404);
      }
      return allCourses
  }
    const getAllCourses= async():Promise<object[]|null>=>{
        const allCourses = await courseModel.find({})
        // console.log(allCourses,"courses list");
        
        return allCourses
    }


    const updateCourseById =async (id:string,CourseDetails:object):Promise<object|null> => {
        const course :object|null = await courseModel.findByIdAndUpdate(id,CourseDetails,{new:true})
        return course
    }
    const unlistCourse =async (id:string,action:string) => {
        let unlist:Boolean|undefined
        if(action === 'unlist')unlist = true
        if(action === 'list')unlist = false
       
        const unlistedCourse = await courseModel.findByIdAndUpdate(id,{unlist},{new:true})
        if(!unlistedCourse) throw new AppError('something went wrong when unlist the course',500)
        return unlist
    }

    

     return {addCourse,findCourseById,getAllCoursesById,updateCourseById,unlistCourse,findCourseByTitle,getAllCourses,findOneCourse,addingClass,getAllCoursesByCategoryId,findClassByTitle}
}

export default courseRepositoryImp