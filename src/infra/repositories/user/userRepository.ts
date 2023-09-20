import { MongoDBUser, userModel } from "../../database/model/userModel";
import { User } from "../../../domain/entities/userModel";
import { userLogintype } from "../../../interface/controller/user/userLoginController";
import { AppError } from "../../../utils/errorHandle";


export type userRepository = {

    createUser:(user:User)=>Promise<User>;
    findOneUserByEmail:(email:string)=>Promise<userLogintype | null>;
    getAllUsers:()=>Promise<object[] | null >;
    getUserById:(id:string)=>{};
    updateUserById:(id:string,userDetails:object)=>Promise<object|null>;
    updateIsBlock:(id:string,action:string)=>Promise<Boolean|undefined>
    findUserIsBlock:(email:string)=>Promise<boolean>
    findUserIsMailVerified:(email:string)=>Promise<boolean>
};


const userRepositoryImp = (UserModel: MongoDBUser): userRepository => {

    const createUser = async(user:User):Promise<User>=>{
        console.log(user,"creating user wiht user detail");
        
        let newUser = await UserModel.create(user)
        console.log(newUser,"newuser");
        
        return newUser
    }
    const findOneUserByEmail =async (email:string):Promise<userLogintype | null> => {
        
        const user: userLogintype | null = await UserModel.findOne({email})
        return user

    }
    const getAllUsers =async():Promise<object[]>=>{

        const allUsers:object[] | null=await UserModel.find({},{password:0})

        if(!allUsers)throw new AppError('Somthing went wrong ',500)
        
        return allUsers
    }

    const getUserById = async(userId:string):Promise<any>=>{
        try {
            console.log(userId,"userID");
        
            const user = await UserModel.findById(userId)
            if(!user){
                console.log("user not found");
                return null
            }
            console.log(user,"user");
            
            return user
        } catch (error) {
            console.error("error ",error);
            throw error
        }
       
    }
    
    const updateUserById = async(id:string,userDetails:object):Promise<object|null>=>{
       
            const user:object|null = await UserModel.findByIdAndUpdate(id,userDetails,{new:true})
           
            return user

         
    }

    const updateIsBlock =async (id:string,action:string):Promise<Boolean|undefined> => {
        let isBlocked :Boolean|undefined 
        if(action === 'block')isBlocked = true
        if(action === 'unblock')isBlocked = false
        const blockedUser = await userModel.findByIdAndUpdate(id,{isBlocked},{new:true})
        if(!blockedUser) throw new AppError('something went wrong when block the user',500)
        return isBlocked
    }
    
    const findUserIsBlock = async(email:string):Promise<boolean>=>{
        const user = await userModel.findOne({email,isBlocked:true})
        console.log(user,"blocked user")
        if(user){
            return true
        }else{
            return false
        }
    }
    const findUserIsMailVerified = async(email:string):Promise<boolean>=>{
        const user = await userModel.findOne({email,isMailVerified:false})
        if(user){
            return true
        }else{
            return false
        }
    }
    return {createUser,findOneUserByEmail,getAllUsers,getUserById,updateUserById,updateIsBlock,findUserIsBlock,findUserIsMailVerified }
}
export default userRepositoryImp