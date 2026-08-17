const Usermodel=require("../models/Usermodel");

exports. addtocart=async(req,res)=>
{
    try
    {
        let userdata=await Usermodel.findOne({_id:req.body.userId});

        let cartData=await userdata.cartData;

        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId]=1;
        }

        else
        {
            cartData[req.body.itemId]+=1;
        }

        await Usermodel.findByIdAndUpdate(req.body.userId,{cartData});

        res.status(201).json(
            {
                success:true,
                message:"Added to Cart",
            }
        )
    }

    catch(error)
    {
        res.status(400).json(
            {
                success:false,
                data:error,  
                message:"Error in Addition",
            }
        )
    }
}

exports. removefromcart=async(req,res)=>
{
    try
    {
        let userdata= await Usermodel.findById(req.body.userId);

        let cartData=await userdata.cartData;

        if(cartData[req.body.itemId]>0)
        {
             cartData[req.body.itemId]-=1;
        }

        await Usermodel.findByIdAndUpdate(req.body.userId,{cartData});

        res.status(201).json(
        {
            success:true,
            message:"Removed SuccessFully",
        });
    }

    catch(error)
    {
        res.status(400).json(
            {
                success:false,
                data:error,
                message:"Error in removal",
            }
        )
    }
}

exports. getcart=async(req,res)=>
{
    try
    {
        let userdata=await Usermodel.findById(req.body.userId);

        let cartData=await userdata.cartData;

        res.status(201).json(
            {
                success:true,
                data:cartData,
                message:"Fetched Successfully",
            }
        )
    }

    catch(error)
    {
        res.status(400).json(
            {
                success:false,
                data:error,
                message:"Error in Fetching",
            }
        )
    }
}
