import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utills/ApiError";
import { User } from "../models/user.model";
import ApiResponse from "../utills/apiresponse";



const UserController =async(req : Request , res : Response , next : NextFunction)=>{
    const {username,password,firstName,lastName} = req.body

    console.log(username,password,firstName,lastName)
    try {

        if(
            [username,password,firstName,lastName].some((field)=> field?.trim()==="")
        ){
            throw new ApiError(400, "All fields are required")
        }

        const existedUser  = await User.findOne({
            username: username
        })

        if(existedUser){
            throw new ApiError(409 , "User already exists")
        }

        const user = await User.create(
            {
                username : username,
                password,
                firstName,
                lastName
            }
        )
        
        const createdUser = await User.findById(user._id).select("-password")

        if(!createdUser){
            throw new ApiError(500 , "Something went wrong while creating user")
        }
        
       res.status(201).json(
        new ApiResponse(200, createdUser , "User created successfully")
    )
        
    } catch (error) {
        console.error("Error in UserController:", error);
        throw new ApiError(400,"Error on creating user")
        
    }



}

export { UserController };