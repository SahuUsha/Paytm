import mongoose from 'mongoose';


const connectDB= async()=>{
    try {
        console.log(process.env.MONGODB_URL)
        const connectInstanceDB = await mongoose.connect(`${process.env.MONGODB_URL}/paytm`)
        console.log(`\n MongoDB connected !! DB Host : ${connectInstanceDB.connection.host}`)
        
    } catch (error) {
        console.log("MongoDb is not connected ",error)
        process.exit(1)
        
    }
}
export default connectDB;