import { Request,Response } from "express"
import userRepositoryImp from "../../../infra/repositories/user/userRepository"
import { userModel } from "../../../infra/database/model/userModel"
import { getUserById } from "../../../app/useCase/admin/getUsers"
import { updateProfile } from "../../../app/useCase/user/userProfile"
import { CustomRequest } from "../../middleware/authMiddleware"
import { loginAdmin } from "../../../app/useCase/admin/adminLogin"
const db = userModel
const userRepository = userRepositoryImp(db)

export const userProfile = async (req:CustomRequest, res: Response) => {
    try {
            
        const userId: string | undefined = req.user?.user._id as string;
        console.log(userId,"userId");
        
        const userData = await getUserById(userRepository)(userId);

        console.log(userData,"userData");

        res.status(200).json(userData);

    } catch (error: any) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
}

export const profileUpdate =async (req:CustomRequest,res:Response) => {
   try {
    const userId:string| undefined = req.user?.user._id as string

    console.log(userId,"userIdforupdation");
    
    const data = req.body as object | any
    console.log(data,"userData for profile updation");

    const userData:object = {
        name:data.name as string,
        email:data.email as string,
        phone:data.phone as number,
        password:data.password as string,
        image:data.image as string
    }
    const updatedProfile = await updateProfile(userRepository)(userId,userData)
    console.log(updatedProfile,"updated profile");
    
    if(updatedProfile){
        console.log("user data updated successfully");
        
        res.status(200).json(updatedProfile)
    }   
    
   } catch (error:any) {
    res.status(500).json({message:error.message||'something went wrong'})
   }
}