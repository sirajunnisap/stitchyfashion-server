import { ObjectId } from "mongoose"

export type Course ={
    _id:string,
    title : string,
    description : string,
    designer : ObjectId,
    category: ObjectId, 
    level: 'beginner,advance,intermediate',      
    courseFee: number,
    duration:string,
    image: string,
    unlist: boolean,
    classes: Classes[];
}
export type Classes = {
  _id?:string,
  title:string,
  description:string,
  video:string
}
