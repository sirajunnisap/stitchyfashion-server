import mongoose,{ Document,Model,Schema } from "mongoose";
import { Category } from "../../../domain/entities/categoryModel";

export type MongoDBCategory = Model<Document<any, any, any >& Category>

const categorySchema = new Schema<Category>({
    name:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String},
})



export const categoryModel: MongoDBCategory = mongoose.connection.model<Document<any,any,any>&Category>('category',categorySchema)