
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { AppError } from "../../../utils/errorHandle";

dotenv.config({ path: path.resolve(__dirname, '../.env')});


export const createToken = (admin:any):string =>{

    const secretKey: string | undefined = process.env.JWT_SECRET_KEY_ADMIN;
    console.log(secretKey,"secret");
    
    if(!secretKey){
        throw new Error('JWT secret key is not defined');
    }
    
    const token = jwt.sign({admin},secretKey as string,{expiresIn:'1h'})
    return token
}

