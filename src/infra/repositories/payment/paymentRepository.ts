import { Payment } from "../../../domain/entities/paymentModel"
import { courseModel } from "../../database/model/courseModel"
import { MongoDBPayment } from "../../database/model/paymentModel"

export type paymentRepository = {
    addPayment :(paymentData:Payment)=>Promise<any>
    findUsers:(courseId:any)=>Promise<any>
    findPurchasedCourse:(userId:any)=>Promise<Payment[]|undefined>
    getPaymentedUser:(userId:any,courseId:any)=>Promise<any>
}

const paymentRepositoryImp = (paymentModel:MongoDBPayment):paymentRepository =>{
    const addPayment = async(paymentData:Payment):Promise<Payment|null>=>{
        // console.log(paymentData,"payment data for addddd pdb");
        
        try {

            console.log(paymentData.selectedCourse,"selected course");
            
            let course=new paymentModel({
                amount:paymentData.amount,
                selectedCourse:paymentData.selectedCourse,
                user:paymentData.user


            })
           const enrldCrse=await  course.save()
            const addedPayment = await paymentModel.findOne({_id:enrldCrse?._id}).populate('selectedCourse').populate('user')
            console.log(addedPayment,"aadddddddd paymeeeeeeee");
            
            console.log(enrldCrse,"cpirse payment ds fka;jf");
            
            // const enrldCrseData:any = await courseModel.findOne({_id:enrldCrse._id})
            // .populate('selectedCourse').populate('user')
            return addedPayment;
            
        } catch (error) {
            // console.error('Error adding course:', error);
            throw error
        }
    }

    const findUsers = async(courseId:any):Promise<any>=>{
        // console.log(courseId,"course di for find usersssssssssss")

        try {
            const paymentWithUser = await paymentModel.find({selectedCourse:courseId}).populate('user').populate('selectedCourse')
            // console.log(paymentWithUser,"populated user form payment model lllllllllll");
           return paymentWithUser;
        } catch (error) {
            
        }
    }

    const findPurchasedCourse = async(userId:any):Promise<Payment[]|undefined>=>{
        try {
            let paymentedCourses = await paymentModel.find({user:userId})
            .populate('user')
            .populate({
                path: 'selectedCourse',
                populate: {
                    path: 'designer',
                },
            })

            return paymentedCourses
        } catch (error) {
            
        }
    }

    const getPaymentedUser = async(userId:any,courseId:any):Promise<any>=>{
        try {
            const paymentedUser = await  paymentModel.findOne({ user: userId, selectedCourse: courseId })
            return paymentedUser
        } catch (error) {
            
        }
    }

   
    return {addPayment,findUsers,findPurchasedCourse,getPaymentedUser}
}


export default paymentRepositoryImp