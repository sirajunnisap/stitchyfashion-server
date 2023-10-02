import { designerRepository } from "../../../infra/repositories/designer/designerRepository";

export const getDesigners = (designerRepository:designerRepository)=>
    async ():Promise<object[]|null>=>{
        const designers = await designerRepository.getAllDesigners()
        return designers
    }


export const getDesignerById = (designerRepository:designerRepository)=>{
    return async(designerId:string):Promise<object|null>=>{
        const designer= await designerRepository.getDesignerById(designerId)
        return designer
    }
}

export const isBlockDesigner = (designerRepository:designerRepository)=>{
    return async(designerId:string,action:string):Promise<Boolean|undefined>=>{
      console.log(designerId,action);
      
      const blockedDesigner = await designerRepository.updateIsBlock(designerId,action)
      return blockedDesigner
    }
  }



  export const searchUsecase = (designerRepository:designerRepository)=>
  async(searchQuery:string,sortCriteria:{}):Promise<object[]|null>=>{
    const designer= await designerRepository.searchDesigner(searchQuery,sortCriteria)
    return designer
  }


