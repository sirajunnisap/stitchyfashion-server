import { ObjectId } from "mongoose"

export type Payment = {
     _id : string,
     amount : string,
     selectedCourse : ObjectId,
     user : ObjectId
}