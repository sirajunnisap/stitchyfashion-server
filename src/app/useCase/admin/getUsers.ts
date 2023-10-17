

import { userRepository } from "../../../infra/repositories/user/userRepository"
// import { updateUserDetails } from "../../../interface/controller/admin/adminLoginController";


export const getUsers=(userRepository:userRepository)=>
async ():Promise<object[] | null>=>{
    const users=await userRepository.getAllUsers()
    return users
}

export const getPaymentedUsers =(userRepository:userRepository)=>
async ():Promise<object[] | null>=>{
    const users=await userRepository.getAllPaymentedUsers()
    return users
}


export const getUserById = (userRepository:userRepository) => {
 return async (userId: string): Promise<object | null> => {
  // console.log(userId,"userId");
  
    const user = await userRepository.getUserById(userId);
    // console.log(user,"user");
    
    return user;
  }
  };



export const isBlockUser = (userRepository:userRepository)=>{
  return async(userId:string,action:string):Promise<Boolean|undefined>=>{
    // console.log(userId,action);
    
    const blockedUser = await userRepository.updateIsBlock(userId,action)
    return blockedUser
  }
}

export const searchUsecase = (userRepository:userRepository)=>
  async(searchQuery:string,sortCriteria:{}):Promise<object[]|null>=>{
    const users= await userRepository.searchUser(searchQuery,sortCriteria)
    return users
  }

