const orderModel=require("../models/Ordermodel");

const UserModel=require("../models/Usermodel");

const Razorpay = require("razorpay");

const dotenv=require("dotenv").config();


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,  
    key_secret: process.env.RAZORPAY_SECRET_KEY,  
});

exports.Placeorder=async(req,res)=>
{

    const frontend_url="http://localhost:3000";

    try {

        const neworder = new orderModel({

            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,

        });

        await neworder.save(); 

        await UserModel.findByIdAndUpdate(req.body.userId, { cartData: {} }); 

        const line_items = req.body.items.map((item) => ({

            name: item.name,
            description: item.description,
            amount: item.price * 100,  // Razorpay expects amount in paise (1 INR = 100 paise)
            currency: "INR",
            quantity: item.quantity,

        }));

        // Add delivery charges to the order
        line_items.push({
            name: "Delivery Charges",
            description: "Delivery Charges",
            amount: 2 * 100,  // Delivery charges in paise
            currency: "INR",
            quantity: 1,
        });

        // Calculate the total amount for the order
        const totalAmount = req.body.amount * 100 + 2 * 100;  // Total amount in paise (items + delivery charges)

        // Create a Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: totalAmount, // Amount in paise
            currency: "INR",
            receipt: neworder._id.toString(), // Using order ID from DB as receipt for tracking
            payment_capture: 1,  // Automatically capture payment after successful transaction
        });

        // Send the Razorpay order details to the frontend
        res.status(200).json({
            success: true,
            data: {
                orderId: razorpayOrder.id,  // Razorpay order ID
                amount: totalAmount,  // Amount in paise
                currency: "INR",
                newid:neworder._id,
            },
            message: "Order Placed Successfully",
        });

    } 
    catch (error)
    {
        console.error(error);
        res.status(400).json(
        {
            success: false,
            message: "Error in Placing Order",
        });
    }

}

exports. verifyorder=async(req,res)=>
{
    const{orderid,success}=req.body;

    try
    {
        if(success=="true")
        {
            await orderModel.findByIdAndUpdate(orderid,{Payment:true});

            console.log("hello"+orderid);

            res.status(201).json(
                {
                    success:true,
                    message:"Paid",
                }
            )
        }

        else
        {
            await orderModel.findByIdAndDelete(orderid,{Payment:false});

            res.status(400).json(
                {
                    success:false,
                    message:"Not Paid",
                    
                }
            )
        }
    }

    catch(error)
    {
        res.status(401).json(
            {
                success:false,
                message:error,
            }
        )
    }
}


exports.userorders=async(req,res)=>
{
    try
    {
        const orders=await orderModel.find({userId:req.body.userId});

        res.status(201).json(
            {
                success:true,
                data:orders, 
            }
        )
    }

    catch(error)
    {
        res.status(401).json(
            {
                success:false,
                data:error,
                message:"Error in Fetching",
            }
        )
    }
}

exports.listorders=async(req,res)=>
{
    try
    {
        const orders=await orderModel.find({});

        res.status(201).json(
            {
                success:true,
                data:orders,
                message:"Fetched Successfully",
            }
        )
    }

    catch(error)
    {
        res.status(401).json(
            {
                success:false,
                data:error,
                message:"Error in Fetching",
            }
        )
    }
}


exports.updatestatus=async(req,res)=>
{
    try
    {

        await orderModel.findByIdAndUpdate(req.body.orderid,{status:req.body.status});

        res.status(201).json(
            {
                success:true,
                message:"Status Updated",
            }
        )
    }

    catch(error)
    {

        res.status(400).json(
            {
                success:false,
                data:error.message,
                message:"Error in Updation"
            }
        )
    }
}