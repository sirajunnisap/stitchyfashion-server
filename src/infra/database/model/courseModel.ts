import mongoose,{ Document,Model,Schema} from "mongoose";
import { Course } from "../../../domain/entities/courseModel";

export type MongoDBCourse = Model<Document<any, any, any >& Course>

const courseSchema = new Schema<Course>({
    title:{type:String,required:true},
    description:{type:String,required:true},
    designer:{type:mongoose.Schema.Types.ObjectId, ref: 'Designer' },
    category:{type:mongoose.Schema.Types.ObjectId, ref: 'Category' },
    courseFee:{type:Number,required:true},
    image:{type:String},
    duration:{type:String,required:true},
    unlist:{type:Boolean,default:false},
    level: { type: String, enum: ['beginner', 'advance', 'intermediate'], required: true },
    classes:[{
        title:{type:String},
        description:{type:String},
        video:{type:String},
    }],
})



export const courseModel: MongoDBCourse = mongoose.connection.model<Document<any,any,any>&Course>('course',courseSchema)