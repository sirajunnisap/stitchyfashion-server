import { Category } from "../../../domain/entities/categoryModel";
import { categoryRepository } from "../../../infra/repositories/course/categoryRepository";
import { AppError } from "../../../utils/errorHandle";



export const categoryAdding = (categoryRepository:categoryRepository)=>{
    return async(category:Category):Promise<Category>=>{


        
        const categoryname = category.name
        const toupperName = categoryname.toUpperCase()
        category.name = toupperName

        
        const isCategoryExist = await categoryRepository.findCategoryByName(category.name)
        console.log(isCategoryExist,"category exist");
        
        if(isCategoryExist){
            throw new AppError('course is already Exist',409)
        }

            console.log(category,"categoryitems");
            
            const addedCategory = await categoryRepository.addCategory(category)
        return addedCategory
        
        
    }
    
}

export const categoryEditUse = (categoryRepository:categoryRepository)=>{
    return async(id:string,categoryData:object):Promise<object|null>=>{
        try {
            const updatedCategory:object|null = await categoryRepository.editCategory(id,categoryData)
            return updatedCategory;

        } catch (error) {
            throw error
        }
    }
}

export const getCategories = (categoryRepository:categoryRepository)=>
async():Promise<object|null>=>{
    const category = await categoryRepository.getAllCategories()
    return category
}