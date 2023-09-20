import { Request,Response } from "express";
import { Category } from "../../../domain/entities/categoryModel";
import { categoryModel } from "../../../infra/database/model/categoryModel";
import { categoryAdding, getCategories } from "../../../app/useCase/admin/addCategory";
import { AppError } from "../../../utils/errorHandle";
import categoryRepositoryImp from "../../../infra/repositories/course/categoryRepository";

const db = categoryModel
const categoryRepository = categoryRepositoryImp(db)


export type CategoryAddType = {
    name:string,
    description:string,
    image:string
}

export const addCategory = async(req:Request,res:Response)=>{
    try {
       
        
        
        const CategoryData = req.body
        console.log(CategoryData,"category data for add");
        

        const addedCategory:Category = await categoryAdding(categoryRepository)(CategoryData)
        if(!addedCategory){
            res.status(500).json({message:"something went wrong"})
        }
         
        
        res.status(200).json({message:"Category created successfully"})
    } catch (error:any) {
       res.status(error.statusCode || 500).json({message:error.message || "somthing went wrong"}) 
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