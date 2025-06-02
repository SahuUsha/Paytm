import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utills/ApiError";
import { User } from "../models/user.model";
import ApiResponse from "../utills/apiresponse";
import  zod, { ParseStatus }  from "zod";
import jwt from "jsonwebtoken"
import { JWT_SECRETE } from "../config";


const signUpSchema =zod.object({
    username : zod.string(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()

})



const UserController =async(req : Request , res : Response , next : NextFunction)=>{
    // const {username,password,firstName,lastName} = req.body

    // console.log(username,password,firstName,lastName)

    const body = req.body;
    const {success} = signUpSchema.safeParse(body);
    try {

        // if(
        //     [username,password,firstName,lastName].some((field)=> field?.trim()==="")
        // ){
        //     throw new ApiError(400, "All fields are required")
        // }

        if(!success){
            throw new ApiError(400, "Invalid input data")
        }

        const existedUser  = await User.findOne({
            username: body.username
        })

        if(existedUser){
            throw new ApiError(409 , "User already exists")
        }

        const user = await User.create(
            {
                username : body.username,
                password : body.password,
                firstName: body.firstName,
                lastName : body.lastName
            }
        )
        
        const createdUser = await User.findById(user._id).select("-password")

        if(!createdUser){
            throw new ApiError(500 , "Something went wrong while creating user")
        }

        // const token = jwt.sign({
        //     userId:createdUser._id,
            
        // },JWT_SECRETE);
        
       res.status(201).json(
        new ApiResponse(200,createdUser, "User created successfully")
    )
        
    } catch (error) {
        console.error("Error in UserController:", error);
        throw new ApiError(400,"Error on creating user")
        
    }
}


const signinBody = zod.object({
    username : zod.string(),
    password: zod.string()
})

const signInController=async(req : Request , res : Response , next : NextFunction)=>{
    const body = req.body;
    const {success} = signinBody.safeParse(body);
    try {
        if(!success){
            throw new ApiError(400, "Invalid input data in sigin" )
        }
 
        const user = await User.findOne({
            username : body.username,
            password : body.password
        })

        if(!user){
            throw new ApiError(404 , "User not found")
        }

        const token = jwt.sign({
            userId : user._id,
        },JWT_SECRETE)

        res.status(200).json(
            new ApiResponse(200, token, "User signed in successfully")
        )

    } catch (error) {
        console.error("Error in signInController:", error);
        throw new ApiError(400,"Error on signing in user")
        
    }
}   
    

const updateUserInputSchema = zod.object({
    password: zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

const updateUser = async(req : Request , res: Response , next : NextFunction)=>{
    const body = req.body;
    const {success} = updateUserInputSchema.safeParse(body)

    try{
        if(!success){
            throw new ApiError(411, "Error while taking input for updation")
        }

        // @ts-ignore
        const user = await User.updateOne({_id: req.userId} , body).select("-password");

        if(!user){
            throw new ApiError(411, "Error while updating user")
        }

        res.status(200).json(new ApiResponse(200 , user , "User updated successfully" ))
    }catch(error){
           console.log("error : " , error );
           throw new ApiError(411 , "error on updation");
    }
}

const getSearchUser=async(req : Request , res : Response , next : NextFunction){

     const filter = req.query.filter as String || ""
    try{
     const users = await User.find({
        $or:[{
            firstName: {
                "$regex" : filter
            }
        },
        {
            lastName : {
                "$regex" : filter
            }
        }
    ]        
     })

     const user =  users.map(user=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))

     res.status(200).json(
        new ApiResponse(200 , user , "Users fetched successfully")
     )
    }catch(error){
        console.log("Error : " , error);
        throw new ApiError(403 , "Error while searching user")
    }

}


export { UserController , 
    signInController , 
    updateUser ,
    getSearchUser };