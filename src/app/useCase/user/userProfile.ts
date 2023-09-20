import { User } from "../../../domain/entities/userModel";
import { userRepository } from "../../../infra/repositories/user/userRepository";


export const getUserById = (userRepository:userRepository) => 
async (id: string): Promise<object | null> => {
    const user = await userRepository.getUserById(id);
    return user;

};

export const updateProfile = (userRepository:userRepository)=>{
   return async (id:string,userDetails:object):Promise<object|null>=>{
  
    const user:object|null= await userRepository.updateUserById(id,userDetails)
    return user
   }
}