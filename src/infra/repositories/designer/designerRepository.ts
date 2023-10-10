import { Designer } from "../../../domain/entities/designerModel";
import { designerLoginType } from "../../../interface/controller/designer/designerLogin";
import { AppError } from "../../../utils/errorHandle";
import { courseModel } from "../../database/model/courseModel";
import { MongoDBDesigner, designerModel } from "../../database/model/designerModel";

export type designerRepository = {
    createDesigner:(designer:Designer)=>Promise<Designer>;
     findDesignerByEmail:(email:string)=>Promise<designerLoginType|null>;
     getAllDesigners:()=>Promise<Object[]|null>;
     getDesignerById:(id:string)=>Promise<Designer>;
     updateDesignerById:(id:string,designerDetails:object)=>Promise<object|null>;
     updateIsBlock:(id:string,action:string)=>Promise<Boolean|undefined>
     findDesignerIsBlock:(email:string)=>Promise<boolean>
     searchDesigner:(searchQuery:string,sortCriteria:{})=>Promise<object[]>

}


const designerRepositoryImp = (DesignerModel:MongoDBDesigner):designerRepository=>{

    const createDesigner = async(designer:Designer):Promise<Designer>=>{
        // console.log(designer,"designer data in reposigoriy");
        
        let newDesigner = await designerModel.create(designer)
        return newDesigner
    }
    const findDesignerByEmail =async (email:string):Promise<designerLoginType|null> => {
        const designerDetails = await DesignerModel.find()
        // console.log(designerDetails,"designerslist");
        
        const designer:designerLoginType|null = await DesignerModel.findOne({email})
        // console.log(designer,"designerDetails");
        
        return designer
    }
    const getAllDesigners =async ():Promise<object[]> => {
        const allDesigners:object[]|null = await designerModel.find({})
        if(!allDesigners)throw new AppError('Somthing went wrong when block the designer',500)
        return allDesigners;
    }
    const getDesignerById = async (designerId:string):Promise<any>=>{

        try {
            const designer  = await designerModel.findById(designerId,{password:0})
            // console.log(designer,"designer in repository");
            
            if(!designer){
                // console.log("designer not found");
                return null
            }
            return designer
            
        } catch (error) {
            throw new AppError('Somthing went wrong when block the designer',500)
        }
    }
    const updateDesignerById = async (id:string,designerDetails:object):Promise<object|null>=>{
        const designer:object|null = await designerModel.findByIdAndUpdate(id,designerDetails,{new:true})
        return designer
    }
    const updateIsBlock =async (id:string,action:string):Promise<Boolean|undefined> => {
        let isBlocked :Boolean|undefined 
        if(action === 'block')isBlocked = true
        if(action === 'unblock')isBlocked = false
        const blockedDesigner = await designerModel.findByIdAndUpdate(id,{isBlocked},{new:true})
        if(!blockedDesigner) throw new AppError('something went wrong when block the designer',500)
        return isBlocked
    }
    const findDesignerIsBlock = async(email:string):Promise<boolean>=>{
        const designer = await designerModel.findOne({email,isBlocked:true})
        // console.log(designer,"blocked designer")
        if(designer){
            return true
        }else{
            return false
        }
    }

    const searchDesigner = async(searchQuery:string,sortCriteria:{}):Promise<object[]>=>{
        const searchresult = await designerModel.find({name:{$regex:searchQuery,$options:'i'}},{password:0}).sort(sortCriteria);
        return searchresult
    }

    
    return {createDesigner,findDesignerByEmail,getAllDesigners,getDesignerById,updateDesignerById,updateIsBlock,findDesignerIsBlock,searchDesigner}
}

export default designerRepositoryImp