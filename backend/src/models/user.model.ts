import mongoose ,{Schema} from "mongoose"





const userSchema = new Schema(
    {
        username :{
            type : String,
            required : true,
            unique : true,
            trim : true,
        },
        password : {
            type : String,
            required : true,
        },
        firstName : {
            type : String,
            required : true,
            trim : true,
        },
        lastName:{
            type : String,
            required : true,
            trim : true,
        }

 },
    {timestamps : true}) 


export const User =  mongoose.model("User",userSchema);