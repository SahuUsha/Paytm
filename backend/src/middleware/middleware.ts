import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utills/ApiError";
import { JWT_SECRETE } from "../config";
import jwt from "jsonwebtoken";




const authMiddleware = async(req : Request, res: Response, next: NextFunction) => {
 
    
    try{
        const authHeader = req.headers.authorization;
    
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new ApiError(401, "Authorization header is missing or invalid"));
        }
    
        const token = authHeader.split(' ')[1];
        if(!token){
            new ApiError(401 ,"Unauthorized access, token is missing")
            return;
        }

        const decoded = jwt.verify(token , JWT_SECRETE);

       if (typeof decoded === 'string') {
           throw new ApiError(403 , "incorrect login for middleware")  // ✅ Now TypeScript knows it's a JwtPayload
        return;
        }
        console.log("decoded", decoded);

        // @ts-ignore
        req.userId = decoded.userId;
        next();
    }catch(error){
        return next(new ApiError(401, "Invalid or expired token"));
    }

}

export { authMiddleware };