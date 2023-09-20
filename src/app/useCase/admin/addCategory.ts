import { Category } from "../../../domain/entities/categoryModel";
import { categoryRepository } from "../../../infra/repositories/course/categoryRepository";
import { AppError } from "../../../utils/errorHandle";



export const categoryAdding = (categoryRepository:categoryRepository)=>{
    return async(category:Category):Promise<Category>=>{

        const isCategoryExist = await categoryRepository.findCategoryByName(category.name)
        if(isCategoryExist){
            throw new AppError('course is already Exist',409)
        }else{
            const addedCategory = await categoryRepository.addCategory(category)
        return addedCategory
        }
        
    }
    
}


export const getCategories = (categoryRepository:categoryRepository)=>
async():Promise<object|null>=>{
    const category = await categoryRepository.getAllCategories()
    return category
}