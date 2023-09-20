import { userRepository } from "../../../infra/repositories/user/userRepository";
import { User } from "../../../domain/entities/userModel";
import { passwordHashing } from "./userValidationHelper";
import { AppError } from "../../../utils/errorHandle";

export const signupUser = (userRepository:userRepository) => {
    //return function for create new user
    return async (user:User):Promise<User> =>{
       
        const hashpassword = await passwordHashing(user?.password)
        console.log(user.password,"password");
        let newUser = {...user,password:hashpassword}
        
        const isUserExist = await userRepository.findOneUserByEmail(user.email)
        
        if(isUserExist){
           throw new AppError ('user is already exist',409) 
        }
        
        const createdUser = await userRepository.createUser(newUser)//this method will create a new user
        return createdUser
    }
}