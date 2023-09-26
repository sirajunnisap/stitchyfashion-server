import { Request,Response } from "express";
import { courseModel } from "../../../infra/database/model/courseModel";
import courseRepositoryImp from "../../../infra/repositories/course/courseRepository";
import { findOneById } from "../../../app/useCase/course/addCourses";
import { CustomRequest } from "../../middleware/authMiddleware";
import { paymentModel } from "../../../infra/database/model/paymentModel";
import { userModel } from "../../../infra/database/model/userModel";
import paymentRepositoryImp from "../../../infra/repositories/payment/paymentRepository";
import { addPaymentUse, getUsersfromPymt } from "../../../app/useCase/payment/addPaymentUse";
import { Payment } from "../../../domain/entities/paymentModel";
import { getUserById } from "../../../app/useCase/user/userProfile";
import userRepositoryImp from "../../../infra/repositories/user/userRepository";


const db = courseModel
const courseRepository = courseRepositoryImp(db)

const paymentdb = paymentModel
const paymentRepository = paymentRepositoryImp(paymentdb)

const userdb = userModel
const userRepository = userRepositoryImp(userdb)

export const checkout = async(req:Request,res:Response)=>{
    try {
        const courseid = req.params.id

        const course = await findOneById(courseRepository)(courseid)
        // console.log(course,"coursedeatils by id");
        
        res.status(200).json(course)
        return
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}


export const paymentforCourse =async (req:CustomRequest,res:Response)=>{
    try {
        
        
        const paymentData = req.body
        // console.log(paymentData,"body data aaaaaaaaaaaa");
        
        
        const userId = req.user?.user._id
        
        // paymentData.course = courseId
        paymentData.user = userId

        const addedPayment:Payment = await addPaymentUse(paymentRepository)(paymentData)
        // console.log(addedPayment,"addedpapypemnt");
        
        
    } catch (error) {
        
    }
}

export const paymentUser = async(req:CustomRequest,res:Response)=>{
    try {
        
        const userId = req.user?.user._id
        const courseId = req.params.id
        console.log(courseId);
        
        // console.log(findUser,"user find for payment ed user user id ");
        
        const paymented = await paymentModel.findOne({ user: userId, selectedCourse: courseId })
        console.log(paymented,"payment duser find ");
        
        res.status(200).json(paymented)
    } catch (error) {
        
    }
}

export const getPaymentedUsers = async(req:Request,res:Response)=>{
    try {
        const courseId = req.params.id
        console.log(courseId,"course idddddddddddddd");


        
        // const userinpayment = await paymentModel.findOne({ course: courseId }).populate('user').exec();

       const users = await getUsersfromPymt(paymentRepository)(courseId)
       console.log(users,"user for show ing designer ");
       

       res.status(200).json(users)
    } catch (error) {
        console.log(error);
        
    }
}
