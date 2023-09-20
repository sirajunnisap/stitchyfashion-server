import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";


export interface CustomRequest extends Request {
    user?: any
}

export const userAuthenticateToken  = (req:CustomRequest,res:Response,next:NextFunction)=>{
    try {
        const authHeader  = req.headers.authorization;
        const secretKey = process.env.JWT_SECRET_KEY;
    
        console.log(authHeader,"asdfghjk");
        
        if(!authHeader || !secretKey){
            return res.send(401).json({success:false,message:'not authenticated',Auth:false})
        }
    
        const token = authHeader.split(' ')[1];

        console.log(token,"1234567890");
        
        jwt.verify(token,secretKey as string , (err:any,user:any)=>{
            if(err){
                return res.status(403).json({success:false, message:'invalid token',Auth:false})
            } 
            req.user = user
            next();
        }
        )
    } catch (error:any) {
        res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
    }
   
}

export const adminAuthenticateToken = (req:CustomRequest,res:Response,next:NextFunction)=>{
    try {
        const authHeader = req.headers.authorization
        const secretKey =process.env.JWT_SECRET_KEY_ADMIN;
        console.log(secretKey);
        
        


        console.log(authHeader,"authheader admin");
        
        if(!authHeader || !secretKey){
            return res.send(401).json({success:false,message:'not authenticated',Auth:false})
        }
        const token = authHeader.split(' ')[1]

        console.log(token,"token from authheader spliting admin");
        
        
        jwt.verify(token,secretKey,(err:any,admin:any)=>{
            if(err){
                return res.status(403).json({ error: 'Invalid token' });     
            }

            req.user = admin
            next()
        })

    } catch (error:any) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
    }
}


export const designerAuthenticateToken = (req:CustomRequest,res:Response,next:NextFunction)=>{
    try {
        const authHeader = req.headers.authorization
        const secretKey = process.env.JWT_SECRET_KEY_DESIGNER;

        console.log(authHeader,"auth header");
        
        if(!authHeader || !secretKey){
            return res.send(401).json({success:false,message:'not authenticated',Auth:false})
        }
        const token = authHeader.split(' ')[1]
        console.log(token , "token ");
        
        jwt.verify(token,secretKey as string ,(err:any,designer:any)=>{
            if(err){
                return res.status(403).json({ error: 'Invalid token' });     
            }

            req.user = designer
            next()
        })

    } catch (error:any) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
    }
}