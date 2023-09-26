import { Payment } from "../../../domain/entities/paymentModel";
import  { paymentRepository } from "../../../infra/repositories/payment/paymentRepository";

export const addPaymentUse = (paymentRepository:paymentRepository)=>{
    return async(paymentData:Payment):Promise<Payment>=>{
        const addedPayment = await paymentRepository.addPayment(paymentData)
        return addedPayment
    }
}


export const getUsersfromPymt = (paymentRepository:paymentRepository)=>{
    return async(courseId:any):Promise<any>=>{
        const usersList = await paymentRepository.findUsers(courseId)
        return usersList
    }
}