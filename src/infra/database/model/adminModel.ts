import mongoose,{Document,Model,Schema} from "mongoose";
import {Admin} from '../../../domain/entities/adminModel';

export type MongoDBAdmin = Model<Document<any,any,any>& Admin>

const adminSchema = new Schema<Admin> ({
    name:{type:String },
    email:{type:String,required:true},
    phone:{type:Number},
    password:{type:String , required:true},
    image: {type:String},
})

export const adminModel:MongoDBAdmin = mongoose.connection.model<Document<any,any,any>&Admin>('admin',adminSchema)