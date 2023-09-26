import { ObjectId } from "mongoose"

export type User = {
    _id:string
    name: string
    email: string
    phone: number
    image:string
    password: string
    isMailVerified: boolean
    isBlocked: boolean
    otp:number
}