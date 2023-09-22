import { Category } from "../../../domain/entities/categoryModel"
import { MongoDBCategory } from "../../database/model/categoryModel";

export type categoryRepository = {
    addCategory :(category:Category)=>Promise<Category>;
    findCategoryByName:(name:string)=>Promise<Category|null>;
    editCategory:(id:string,categoryDetails:object)=>Promise<object|null>
    getAllCategories:()=>Promise<object[]|null>;
    findCategoryById:(id:string)=>Promise<Category>;
}

const categoryRepositoryImp = (categoryModel:MongoDBCategory):categoryRepository=>{
    const addCategory = async (category:Category):Promise<Category>=>{
        try {
            const addedCategory = await categoryModel.create(category);
            console.log(addedCategory,"added category");
            return addedCategory
            
        } catch (error) {
            console.error('Error adding course:', error);
            throw error;
        }
    }
    const findCategoryByName = async (name:string):Promise<Category|null>=>{
        const title = name.toUpperCase()
        const category = await categoryModel.findOne({title});
        return category
    }
   

    const getAllCategories= async():Promise<object[]|null>=>{
            const allCategories = await categoryModel.find({})
            return allCategories
        }


    const findCategoryById = async (categoryId:string):Promise<any> => {
        const category = await categoryModel.findById(categoryId)
        return category
    }


    const editCategory = async(id:string, categoryDetails:object):Promise<object|null>=>{
        const updatedCategory: object|null = await categoryModel.findByIdAndUpdate(id,categoryDetails,{new:true})
        return updatedCategory
    }

    return {addCategory,findCategoryByName,getAllCategories,findCategoryById,editCategory}
}


export default categoryRepositoryImp