const mongoose=require("mongoose");

const connectDB=async ()=>
{
    await mongoose.connect(process.env.MONGO_URI).then(()=>
    {
        console.log("*****DATABASE CONNECTED SUCCESSFULLY*****")
    })

    .catch((error)=>
    {
        console.log("Error in connecting Database");
        console.log(error.message);
        process.exit(0);
    });
}


module.exports=connectDB;

