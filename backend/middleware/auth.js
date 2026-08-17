const jwt=require("jsonwebtoken");

const authmiddleware=async(req,res,next)=>
{
    const {token}=req.headers;

    if(!token)
    {
        res.status(404).json(
            {
                success:false,
                message:"Please login again",
            }
        )
    }

    try {
        
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
        next();
    } 
    
    catch (error) {
        res.status(400).json(
            {
                success:false,
                message:error,
            }
        )
    }
}

module.exports = authmiddleware;