

import mongoose , { Document, Model, Schema } from "mongoose";
import { Designer} from "../../../domain/entities/designerModel";

export type MongoDBDesigner = Model<Document<any, any, any >& Designer>


  
const designerSchema= new Schema<Designer> ({
    name:{type:String , required:true},
    email:{type:String , required:true},
    phone:{type:Number , required:true},
    password:{type:String},
    image: {type:String},
    isBlocked:{type:Boolean, default:false},
    isMailVerified:{type:Boolean, default:false},
    field:{type:String},
    aboutMe:{type:String}
},{
    timestamps: {createdAt: true}
});

export const designerModel: MongoDBDesigner = mongoose.connection.model<Document<any,any,any>&Designer>('designer',designerSchema)