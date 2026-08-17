const mongoose=require("mongoose");


const Userschema=new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true,
        },

        email:
        {
            type:String,
            required:true,
            unique:true,
        },

        password:
        {
            type:String,
            required:true,
        },

        cartData:
        {
            type:Object,
            default:{},
        }
    },{minimize:false}
)

const Usermodel=mongoose.models.User||mongoose.model("User",Userschema);

module.exports=Usermodel;