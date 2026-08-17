const express=require("express");   

const cors=require("cors");

const connectDB  = require("./config/database");

const approutes=require("./Routes/approutes");

const app=express();

const dotenv=require("dotenv").config();

const PORT=4000;

app.use(express.json());

app.use(cors());

connectDB();

app.use("/api/v1/grabfood/",approutes);

app.listen(PORT,()=>{
    console.log("Server Started at the port "+ PORT);
})


app.get('/',(req,res)=>{
    res.send("Hello World");
})


// npm run server