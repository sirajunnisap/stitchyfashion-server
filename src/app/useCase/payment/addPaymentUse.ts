import { Payment } from "../../../domain/entities/paymentModel";
import  { paymentRepository } from "../../../infra/repositories/payment/paymentRepository";

export const addPaymentUse = (paymentRepository:paymentRepository)=>{
    return async(paymentData:Payment):Promise<Payment|null>=>{
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

export const purchasedCoursesUse = (paymentRepository:paymentRepository)=>{
    return async(userId:any):Promise<Payment[]|undefined>=>{
       
        const purchaseCourses = await paymentRepository.findPurchasedCourse(userId)
        console.log(purchaseCourses,"purchased courseeee");
        
        return purchaseCourses
    }
}

export const getpaymentUserUser = (paymentRepository:paymentRepository)=>{
    return async(userId:any,courseId:any):Promise<Payment[]|undefined>=>{
        const paymentedUser = await paymentRepository.getPaymentedUser(userId,courseId)
        return paymentedUser
    }
}

