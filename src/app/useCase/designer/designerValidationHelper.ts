
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { AppError } from "../../../utils/errorHandle";

dotenv.config({ path: path.resolve(__dirname, '../.env')});

export const createToken = (designer:any):string=>{

const secretKey: string | undefined = process.env.JWT_SECRET_KEY_DESIGNER;
if(!secretKey){
    throw new AppError('JWT secret key is not defiened',401)
}
const token = jwt.sign({designer},secretKey as string,{expiresIn:'1h'})
return token
}
