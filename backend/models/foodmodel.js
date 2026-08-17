const mongoose=require("mongoose");

const foodSchema=new mongoose.Schema(
    {
        image:
        {
            type:String,
            require:true,
        },
        
        name:
        {
            type:String,
            require:true,
        },

        description:
        {
            type:String,
            required:true,
        },

        price:
        {
            type:String,
            required:true,
        },

        category:
        {
            type:String,
            required:true,
        },
    }
)


const foodModel=mongoose.models.food||mongoose.model("foodModel",foodSchema);


module.exports=foodModel;