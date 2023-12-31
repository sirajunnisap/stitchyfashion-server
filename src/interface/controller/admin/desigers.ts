import { Request,Response } from "express";
import { designerModel } from "../../../infra/database/model/designerModel";
import designerRepositoryImp from "../../../infra/repositories/designer/designerRepository";
import { AppError } from "../../../utils/errorHandle";
import { getDesigners, isBlockDesigner, searchUsecase } from "../../../app/useCase/admin/getDesigners";

const db = designerModel;
const designerRepository = designerRepositoryImp(db)

export const getAllDesigners =  async(req:Request,res:Response)=>{
    try {
        const allDesigners = await getDesigners(designerRepository)()
        if(!allDesigners){
            throw new AppError("something went wrong",400)
        }
        
        res.status(200).json(allDesigners)
        return
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message|| "something went wrong"})
    }
}

export const blockDesigner = async(req:Request,res:Response)=>{
    try {
        const {designerId,action} = req.body
        console.log(designerId,action,"designer action");

        if(!designerId || !action)throw new AppError("not found",404)

        const blockedDesigner = await isBlockDesigner(designerRepository)(designerId,action)
        if(blockedDesigner === null)throw new AppError("something went wrong while fetch the user",500)
        if(blockedDesigner === true) {
            res.status(200).json({message:"designer blocked successfully"})
            return
        }else if(blockedDesigner === false){
            res.status(200).json({message:"designer unblocked successfully"})
            return
        }
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message|| "something went wrong"})
    }
}



export const searchDesigners = async (req: Request, res: Response) => {
    try {
        const searchQuery = req.query.q as string

        const sort = req.query.sort
        let sortCriteria: object = {}
        if (sort === 'name-1') sortCriteria = { name: 1 }
        else if (sort === 'name1') sortCriteria = { name: -1 }
        else sortCriteria = {}

        const result = await searchUsecase(designerRepository)(searchQuery, sortCriteria)
        res.status(200).json(result)

    } catch (error: any) {
        console.log(error)
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}




// export const getDesignerMoreInfo = async (req: Request, res: Response) => {
//     try {
//          const userId:any = req.params.id 
//          const result = await purchasedCoursesUse(paymentRepository)(userId)
//          res.status(200).json(result)
//          return
//     } catch (error) {
        
//     }
// }