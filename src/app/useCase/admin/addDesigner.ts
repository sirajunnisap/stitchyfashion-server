
import { designerRepository } from '../../../infra/repositories/designer/designerRepository'
import { Designer } from '../../../domain/entities/designerModel'
import { AppError } from '../../../utils/errorHandle'

export const addDesigner = (designerRepository:designerRepository) =>{
    return async (designer:Designer):Promise<Designer>=>{
        const isDesignerExist = await designerRepository.findDesignerByEmail(designer.email)
        if(isDesignerExist){
            throw new AppError('designer is already exist',409)
        }
        const createdDesigner:Designer = await designerRepository.createDesigner(designer)
        console.log(createdDesigner,"creted designer");
        
        return createdDesigner
    }
} 
  