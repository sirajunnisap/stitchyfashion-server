import { ObjectId } from "mongoose"

export type Designer = {
    _id:string;
    name: string;
    email: string;
    phone: number;
    password: string;
    image: string;
    isBlocked:boolean;
    isMailVerified: boolean;
    field:string;
    aboutMe:string;
};


