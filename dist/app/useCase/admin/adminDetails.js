"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminById = void 0;
const getAdminById = (adminRepository) => {
    return async (adminId) => {
        const admin = await adminRepository.getAdminById(adminId);
        return admin;
    };
};
exports.getAdminById = getAdminById;
// export const updateProfile = (adminRepository:adminRepository)=>{
//     return async (adminId:string,adminDetails:object):Promise<object|null>=>{
//         const admin:object|null = await adminRepository.updateAdminById(adminId,adminDetails)
//         return admin
//     }
// }
