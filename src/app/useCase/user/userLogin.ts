import { userRepository } from "../../../infra/repositories/user/userRepository";
import { userLogintype } from "../../../interface/controller/user/userLoginController";
import { User } from "../../../domain/entities/userModel";
import { AppError } from "../../../utils/errorHandle";
import { passwordCompare , createToken } from "./userValidationHelper";
// import { passwordCompare } from "./userValidationHelper";


type userReturnType = {
    token : string
    userData : userLogintype
}


export const loginUser = (userRepository:userRepository) =>{
    return async(user:userLogintype): Promise<userReturnType> => {

        const {email,password} = user

        const isUserExist:userLogintype | null = await userRepository.findOneUserByEmail(email)  //check the user is already exist
        if(!isUserExist){
            throw new AppError('User is not exist',404)
        }
        
        console.log(isUserExist,"useer");
        const isblockedUser = await userRepository.findUserIsBlock(email)
        if(isblockedUser)throw new AppError('user is blocked by admin',404)
        
        const isMailVerifiedUser = await userRepository.findUserIsMailVerified(email)
        if(isMailVerifiedUser)throw new AppError('you need to verify your email',404)
        
        const ispasswordCorrect = await passwordCompare(password,isUserExist.password)
        if(!ispasswordCorrect){
            console.log("password incorrect");
            
            throw new AppError('incorrect password',401)
        }else{
            console.log("password matched");
            
        }
        const userToken = await createToken(isUserExist)
        const verifiedUser = {
            token: userToken,
            userData: user
        }

        return verifiedUser

    }

}

export const loginGoogle = (userRepositoty:userRepository)=>{
    return async (user:any):Promise<userReturnType>=>{
        console.log(user,"user data ");
        
        const {email,name,phone} = user 

        let verifiedUser:userReturnType
        const isUserExist = await userRepositoty.findOneUserByEmail(email)
        if(!isUserExist){
            const newUser = await userRepositoty.createUser(user)
            
            const token =await createToken(newUser)

            verifiedUser ={
                token:token,
                userData:newUser,
                // message:'login success'
            }
            console.log(verifiedUser,"verified user with token ,data");
            
            return verifiedUser
        }
    const token = await createToken(isUserExist)
    verifiedUser ={
        token:token,
        userData:isUserExist,
    }
    return verifiedUser
}
}