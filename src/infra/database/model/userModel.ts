
import mongoose , { Document, Model, Schema } from "mongoose";
import { User } from "../../../domain/entities/userModel";

export type MongoDBUser = Model<Document<any, any, any >& User>

const userSchema= new Schema<User> ({
    name:{type:String },
    email:{type:String , required:true},
    phone:{type:Number },
    password:{type:String },
    image:{type:String},
    isMailVerified:{type:Boolean, default:false},
    isBlocked:{type:Boolean, default:false},
    otp:{type:Number}
},{
    timestamps: {createdAt: true}
});

export const userModel: MongoDBUser = mongoose.connection.model<Document<any,any,any>&User>('user',userSchema)