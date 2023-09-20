import { Request,Response } from "express"
import { designerModel } from "../../../infra/database/model/designerModel";
import designerRepositoryImp from "../../../infra/repositories/designer/designerRepository";
import { getDesignerById, updateProfile } from "../../../app/useCase/designer/designerDetails";
import { CustomRequest } from "../../middleware/authMiddleware";


const db = designerModel
const designerRepository = designerRepositoryImp(db)

export const designerProfile = async (req: CustomRequest, res: Response) => {
    try {
        const designerId: string | undefined = req.user?.designer._id as string;
console.log(designerId,"designerIdfor profile");

        
        const designerData = await getDesignerById(designerRepository)(designerId);

        console.log(designerData,"designerData");
        
        res.status(200).json(designerData);
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
}

export const profileUpdate =async (req:CustomRequest,res:Response) => {
   try {
    const designerId:string| undefined = req.user?.designer._id as string
    console.log(designerId,"designerid for profileupdate");
    
    const data = req.body as object | any
    console.log(data,"designerdata for profile updation");

    const designerData:object = {
        name:data.name as string,
        email:data.email as string,
        phone:data.phone as number,
        image:data.image as string,
        field:data.field as string,
        aboutMe:data.aboutMe as string
    }
console.log(designerData,"designerdata");

    const updatedProfile = await updateProfile(designerRepository)(designerId,designerData)
    if(updatedProfile){

        console.log("designer data updated successfully",updatedProfile);
        
        res.status(200).json(updatedProfile)
    }   
    
   } catch (error:any) {
    res.status(500).json({message:error.message||'something went wrong'})
   }
}


export const getDesigner =async (req:Request,res:Response)=>{
 try {
    const designerId:string|undefined = req.params.id as string
    console.log(designerId,"designeridforgetdata");
    
    const designer = await getDesignerById(designerRepository)(designerId)
    console.log(designer,"designer data by designerid ");

    res.status(200).json(designer)
    return 
 } catch (error) {
    
 }
}