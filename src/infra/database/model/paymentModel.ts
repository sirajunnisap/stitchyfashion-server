import mongoose,{ Document,Model,Schema} from "mongoose";
import { Payment } from "../../../domain/entities/paymentModel";

export type MongoDBPayment = Model<Document<any, any, any >& Payment>

const paymentSchema = new Schema<Payment>({
    amount:{type:String},
    selectedCourse:{type:mongoose.Schema.Types.ObjectId, ref: 'course' },
    user:{type:mongoose.Schema.Types.ObjectId, ref: 'user' },
    designer:{type:mongoose.Schema.Types.ObjectId, ref: 'designer' },
})



export const paymentModel: MongoDBPayment = mongoose.connection.model<Document<any,any,any>&Payment>('payment',paymentSchema)