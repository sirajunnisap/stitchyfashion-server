import { Request, Response } from "express";
import { getUsers, isBlockUser, searchUsecase ,getPaymentedUsers, getUserById} from "../../../app/useCase/admin/getUsers";
import { AppError } from "../../../utils/errorHandle";
import { userModel } from "../../../infra/database/model/userModel";
import userRepositoryImp from "../../../infra/repositories/user/userRepository";
import { User } from "../../../domain/entities/userModel";
import { purchasedCoursesUse } from "../../../app/useCase/payment/addPaymentUse";
const db = userModel
const userRepository = userRepositoryImp(db)
interface UserData {
    _id: string
    name: string
    email: string
    phone: number
    password: string
    isMailVerified: boolean
    isBlocked: boolean
}
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await getUsers(userRepository)()
        if (!allUsers) {
            throw new AppError("something went wrong", 400);

        }
        res.status(200).json(allUsers)
        return

    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" })
    }
}


export const getAllPaymentedUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await getPaymentedUsers(userRepository)()
        if (!allUsers) {
            throw new AppError("something went wrong", 400);

        }
        res.status(200).json(allUsers)
        return

    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" })
    }
}

export const blockUser = async (req: Request, res: Response) => {
    try {

        const { userId, action } = req.body
        console.log(userId, action, "userid action");

        if (!userId || !action) throw new AppError("not found", 404)

        const blockedUser = await isBlockUser(userRepository)(userId, action)
        if (blockedUser === null) throw new AppError("something went wrong while fetch the user", 500)
        if (blockedUser === true) {
            res.status(200).json({ message: "user blocked successfully" })
            return
        } else if (blockedUser === false) {
            res.status(200).json({ message: "user unblocked successfully" })
            return
        }
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" })
    }
}


export const searchUsers = async (req: Request, res: Response) => {
    try {
        const searchQuery = req.query.q as string

        console.log(searchQuery,"searching quey form frontend");
        
        const sort = req.query.sort

        console.log(sort,"sorting data from frondent");
        
        let sortCriteria: object = {}
        if (sort === 'name-1') sortCriteria = { name: 1 }
        else if (sort === 'name1') sortCriteria = { name: -1 }
        else sortCriteria = {}

        console.log(sortCriteria,"sortcriteria");
        
        const result = await searchUsecase(userRepository)(searchQuery, sortCriteria)
        res.status(200).json(result)

    } catch (error: any) {
        console.log(error)
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

export const getUserData = async (req: Request, res: Response) => {
    try {
         const userId:any = req.params.id 
         const userData = await getUserById(userRepository)(userId)
         res.status(200).json(userData)
         return
    } catch (error) {
        
    }
}

