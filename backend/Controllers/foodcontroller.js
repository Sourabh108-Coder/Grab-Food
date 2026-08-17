const foodModel=require("../models/foodmodel");


exports.addfood=async(req,res)=>
{
    try
    {
        const{image,name,description,price,category}=req.body;

        const foodmode=foodModel.create({image,name,description,price,category});

        res.status(201).json(
            {
                success:true,
                data:foodmode,
                message:"Data Inserted Successfully",
            }
        );
    }

    catch(error)
    {
        res.status(500).json(
            {
                success:false,
                data:"Internal Server Error",
                message:error.message,
            }
        );
    }
};

exports.listfood=async(req,res)=>
{
    try
    {
        const foods=await foodModel.find({});

        res.status(201).json(
            {
                success:true,
                data:foods,
                message:"Data Fetched SuccessFully",

            }
        )
    } 
    
    catch(error)
    {
        res.status(404).json(
            {
                success:false,
                data:"Error in Fetching Data",
                message:error.message,
            }
        )
    }
}

exports.removefood=async(req,res)=>
{

    const{Id}=req.body;

    const food= await foodModel.findByIdAndDelete(Id);

    try
    {
        res.status(201).json(
            {
                success:true,
                data:food,
                message:"Food Item Deleted SuccessFully",
            }
        )
    }

    catch(error)
    {
        res.status(404).json(
            {
                success:false,
                data:"Error in Deleting Data",
                message:error.message,
            }
        )
    }
}