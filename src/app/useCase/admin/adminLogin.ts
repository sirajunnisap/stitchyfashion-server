import { adminRepository } from "../../../infra/repositories/admin/adminRepository"
import { Admin } from "../../../domain/entities/adminModel"
import { adminLoginType } from "../../../interface/controller/admin/adminLoginController"

import { AppError } from "../../../utils/errorHandle"
import { createToken } from "./adminValidationHelper"

type adminReturnType = {
    token:string,
    adminData : adminLoginType
}

export const loginAdmin = (adminRepository:adminRepository)=>{
    return async (admin:adminLoginType):Promise<adminReturnType>=>{
        
        const {email,password} = admin
        console.log(email,password,"admin emailpassword");
        
        const isadminExist:adminLoginType | null = await adminRepository.findAdminbyEmail(email)
        if(!isadminExist){
            throw new AppError("admin is not exist",400)
        }
        console.log(isadminExist,"admindatafromisadminexist");
        
       
         if(isadminExist){
            if(isadminExist.password !== password){
                throw new AppError('incorrect password',401)
             }
         }

        const adminToken = await createToken(isadminExist)
        const verifiedAdmin = {
            token: adminToken,
            adminData: admin
        }

        return verifiedAdmin
    }
}


