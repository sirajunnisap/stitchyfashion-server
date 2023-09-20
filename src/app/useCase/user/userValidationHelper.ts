import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../.env')});

export const passwordHashing: Function = async (password:string):Promise<string> => {
    console.log(password,"pawwdsf");
    
    const hashedPassword = await bcrypt.hash(password,10);
    return hashedPassword

}

export const passwordCompare : Function = async (plainTextPassword:string,hashedPassword:string):Promise<boolean>=>{
    const password:boolean = await bcrypt.compare(plainTextPassword,hashedPassword);
    return password
}

export const createToken = (user:any):string =>{
    const secretKey: string | undefined = process.env.JWT_SECRET_KEY;
    
    if(!secretKey){
        throw new Error('JWT secret key is not defined');
    }
    const token = jwt.sign({user}, secretKey as string, {expiresIn: '1h'})
    return token

}