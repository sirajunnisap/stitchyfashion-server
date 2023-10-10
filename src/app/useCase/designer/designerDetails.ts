import { designerRepository } from "../../../infra/repositories/designer/designerRepository";



export const getDesignerById = (designerRepository:designerRepository) => 
async (id: string): Promise<object | null> => {
    const user = await designerRepository.getDesignerById(id);
    return user;

};

export const updateProfile = (designerRepository:designerRepository)=>{
   return async (id:string,userDetails:object):Promise<object|null>=>{
  
    const user:object|null= await designerRepository.updateDesignerById(id,userDetails)
    return user
   }
}

