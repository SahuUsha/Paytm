import { NextFunction, Request, Response } from "express";
import { authMiddleware } from "../middleware/middleware";
import mongoose from "mongoose";
import { Account } from "../models/account.modal";
import { ApiError } from "../utills/ApiError";
import ApiResponse from "../utills/apiresponse";


const TransferMoney = async(req:Request,res : Response , next : NextFunction)=>{
try {

         
     const session = await mongoose.startSession();
    
     session.startTransaction();
     const {amount ,to} = req.body;

        if(!amount || !to){
            await session.abortTransaction();
            throw new ApiError(400, "Amount and recipient are required");
        }
     
        //  @ts-ignore
         console.log("req.userId", req.userId);
     const account = await Account.findOne({
        // @ts-ignore
        userId : new mongoose.Types.ObjectId(req.userId as string)
     }).session(session);

     console.log("account", account);
    
     if(!account){
        await session.abortTransaction();
        throw new ApiError(400,"User does not exist")
     }
    
     if(account.balance < amount){
        await session.abortTransaction();
        throw new ApiError(400,"Insufficient balance")
     }
    
     const toAccount = await Account.findOne(
        {
            userId : to
        }
     ).session(session)

     console.log("toAccount", toAccount);
    
     if(!toAccount){
        await session.abortTransaction();
        throw new ApiError(400 ,"Receiver does not exist")
     }
    
     await Account.updateOne({
        // @ts-ignore
        userId : req.userId
     },
     {
        $inc : {
            balance : -amount
        }
     }
    ).session(session);
    
     await Account.updateOne({
        userId : to
    },
    {
        $inc :{
            balance : amount
        }
    }
    ).session(session);
    
    await session.commitTransaction();
    session.endSession();
    
    res.status(200).json(
        new ApiResponse(200, "Transfer successful", "Amount transferred successfully")
    )
} catch (error) {
    console.log("Error in TransferMoney:", error);
    throw new ApiError(500, "Error transferring money");
}

}

const getUserInfo = async(req: Request , res : Response, next : NextFunction)=>{

 try {
    // @ts-ignore
       const userId = new mongoose.Types.ObjectId(req.userId as string)
   
       const getUserInfo = await Account.findOne({
           userId : userId
       }).populate("userId",("username firstName lastName") )

         if(!getUserInfo){
              throw new ApiError(404, "User not found");
         }

       res.status(200).json(
        new ApiResponse(200, getUserInfo , "User information retrieved successfully")
       )
 } catch (error) {
    console.error("Error in getUserInfo:", error);
    throw new ApiError(500 , "Error retrieving user information");
 }
}

export {TransferMoney ,getUserInfo}