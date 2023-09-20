import { adminRepository } from "../../../infra/repositories/admin/adminRepository";

export const getAdminById = (adminRepository:adminRepository)=>{
    return async(adminId:string):Promise<object|null>=>{

        const admin = await adminRepository.getAdminById(adminId)

        return admin
    }
}

// export const updateProfile = (adminRepository:adminRepository)=>{
//     return async (adminId:string,adminDetails:object):Promise<object|null>=>{
//         const admin:object|null = await adminRepository.updateAdminById(adminId,adminDetails)
//         return admin
//     }
// }