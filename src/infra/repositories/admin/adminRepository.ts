import { MongoDBAdmin, adminModel } from "../../database/model/adminModel";
import { adminLoginType } from "../../../interface/controller/admin/adminLoginController";
import { Admin } from "../../../domain/entities/adminModel";



export type adminRepository = {
  
    findAdminbyEmail:(email:string)=>Promise<adminLoginType | null>;
    getAdminById :(id:string)=>Promise<Admin>;
    updateAdminById:(id:string,adminDetails:object)=>Promise<object|null>
}


const adminRepositoryImp = (AdminModel:MongoDBAdmin):adminRepository =>{
        
    const findAdminbyEmail = async (email:string):Promise<adminLoginType|null>=>{
            const admindetails = await AdminModel.find()
            console.log(admindetails,"adminlist");
            
            const admin:adminLoginType|null = await AdminModel.findOne({email})
            console.log(admin,'admin details');
            
        return admin
        
    }
    const getAdminById = async(adminId:string):Promise<any>=>{
        try {
            const admin = await adminModel.findById(adminId,{password:0})
            if(!admin){
                return null
            }
            return admin
        } catch (error:any) {
            throw error
        }
    }
    const updateAdminById = async (id: string, adminDetails: object): Promise<object | null> => {
        console.log(adminDetails, "adminDetails for update");
        console.log(id, "id for admin update");
      
        const updatedAdmin: object | null = await adminModel.findByIdAndUpdate(id, adminDetails, { new: true });
      
        console.log(updatedAdmin, "updatedAdmin");
      
        return updatedAdmin;
      };
      
    return {findAdminbyEmail,getAdminById,updateAdminById}
}

export default adminRepositoryImp