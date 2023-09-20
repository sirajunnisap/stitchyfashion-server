import { Request,Response } from "express";
import { adminModel } from "../../../infra/database/model/adminModel";
import adminRepositoryImp from "../../../infra/repositories/admin/adminRepository";
// import { getAdminById } from "../../../app/useCase/admin/adminDetails";
import { CustomRequest } from "../../middleware/authMiddleware";
import { AdminById, updateProfile} from "../../../app/useCase/admin/adminProfile";
const db = adminModel
const adminRepository = adminRepositoryImp(db)

export const adminProfile = async(req:CustomRequest,res:Response)=>{
    try {
        const adminId:string|undefined = req.user?.admin._id as string

        console.log(adminId,"adminId");
        
        const adminData = await AdminById(adminRepository)(adminId)

        res.status(200).json(adminData);
    }catch (error: any) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
}

export const profileUpdate = async (req: CustomRequest, res: Response) => {
    try {
      const userId: string | undefined = req.user?.admin._id as string;
      console.log(userId, "userIdforupdation");
  
      const data = req.body as object | any;
      console.log(data, "userData for profile updation");
  
      const userData: object = {
        name: data.name as string,
        email: data.email as string,
        phone: data.phone as number,
        password: data.password as string,
        image: data.image as string,
      };
  
     
      const updatedProfile = await updateProfile(adminRepository)(userId, userData);
      console.log(updatedProfile, "updated profile");
  
      if (updatedProfile) {
        console.log("user data updated successfully");
        res.status(200).json(updatedProfile);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'something went wrong' });
    }
  };
  