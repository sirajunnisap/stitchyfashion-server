import { adminRepository } from "../../../infra/repositories/admin/adminRepository"


export const AdminById = (adminRepository:adminRepository)=>
async(id:string):Promise<object|null>=>{
    const user = await adminRepository.getAdminById(id);
    return user
}
export const updateProfile = (adminRepository: adminRepository) => {
    return async (id: string, adminData: object): Promise<object | null> => {
      console.log(adminData, "adminData");
  
      try {
        const updatedAdmin: object | null = await adminRepository.updateAdminById(id, adminData);
        console.log(updatedAdmin, "updatedAdmin");
  
        return updatedAdmin;
      } catch (error) {
        console.error(error);
        throw error; 
      }
    };
  };