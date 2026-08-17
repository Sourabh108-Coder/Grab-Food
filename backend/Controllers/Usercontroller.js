const Usermodel=require("../models/Usermodel");

const jwt=require("jsonwebtoken");

const bcrypt=require("bcrypt");

const validator=require("validator");

const dotenv=require("dotenv").config();




const createtoken=(id)=>
{
    return jwt.sign({id},process.env.JWT_SECRET);
}


exports.registeruser=async(req,res)=>
{
    
    const{name,email,password}=req.body;

    try
    {
        const exist=await Usermodel.findOne({email});

        if(exist)
        {
            res.status(400).json(
                {
                    success:false,
                    message:"Account Already exist !!",
                }
            );
        }

        if(!validator.isEmail(email))
        {
            res.status(400).json(
                {
                    success:false,
                    message:"Enter a valid Email !!",
                }
            )
        }

        if(password.length<8)
        {
            res.status(200).json(
                {
                    success:false,
                    message:"Please Enter a Strong Password ",
                }
            )
        }

        const salt=await bcrypt.genSalt(10);

        const hashpass=await bcrypt.hash(password,salt);

        const NewUser=new Usermodel(
            {
                name:name,
                email:email,
                password:hashpass,
            }
        );

        const User=await NewUser.save();

        const token=createtoken(User._id);

        res.status(201).json(
            {
                success:true,
                data:token,
                message:"User Created Successfully"
            }
        )

    }

    catch(error)
    {

        res.status(500).json(
            {
                success:false,
                data:error,
                message:"Error in Creation of User",
            }
        )
    }
}

exports.loginuser=async(req,res)=>
{
    const{email,password}=req.body;

    try
    {
        const User=await Usermodel.findOne({email});

        if(!User)
        {
            res.status(200).json(
            {
                status:false,
                message:"Don't have Such Account",
            }
            );
        }

        const ismatch=await bcrypt.compare(password,User.password);

        if(!ismatch)
        {
            res.status(400).json(
            {
                status:false,
                message:"Password Is Invalid",
            }
            );
        }

        const token=createtoken(User._id);

        res.status(200).json(
            {
                success:true,
                data:token,
                message:"Login SuccessFully",
            }
        )
    }

    catch(error)
    {
        res.status(400).json(
        {
            success:false,
            data:error,
            message:"Error in Logging",
        }
        );
    }
}