import { designerRepository } from "../../../infra/repositories/designer/designerRepository";
import { designerLoginType } from "../../../interface/controller/designer/designerLogin";
import { AppError } from "../../../utils/errorHandle";
import { createToken } from "./designerValidationHelper";



type designerReturnType = {
    token:string,
    designerData:designerLoginType

}
export const loginDesigner = (designerRepository:designerRepository)=>{
    return async(designer:designerLoginType):Promise<designerReturnType>=>{
        
        const {email,password} = designer
        // console.log(email,password,"designeremailpassword");
        
        const isDesignerExist:designerLoginType|null = await designerRepository.findDesignerByEmail(email)
        // console.log(isDesignerExist,"designer exist");
        
        if(!isDesignerExist){
            throw new AppError("adminis not exist",400)
        }
        const isBlockDesigner = await designerRepository.findDesignerIsBlock(email)
        if(isBlockDesigner)throw new AppError("designer blocked by admin",404)
        if(isDesignerExist){
            if(isDesignerExist.password !== password){
                throw new AppError('incorrenct password',401)
            }
        }

        const designerToken = await createToken(isDesignerExist)
        const verifiedDesigner = {
            token:designerToken,
            designerData:designer
        }
        return verifiedDesigner
    }
}