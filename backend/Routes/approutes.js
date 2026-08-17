const express=require("express");

const {addfood,listfood,removefood}=require("../Controllers/foodcontroller");

const {loginuser,registeruser}=require("../Controllers/Usercontroller");

const {addtocart,removefromcart,getcart}=require("../Controllers/cartcontroller");

const { verifyorder, userorders, listorders, updatestatus } = require("../Controllers/ordercontroller");

const {Placeorder}=require("../Controllers/ordercontroller");

const authmiddleware=require("../middleware/auth");


const router=express.Router();

router.post("/addfood",addfood);

router.get("/list",listfood);

router.post("/remove",removefood);

router.post("/register",registeruser);

router.post("/login",loginuser);

router.post("/addcart",authmiddleware,addtocart);

router.post("/removecart",authmiddleware,removefromcart);

router.post("/getcart",authmiddleware,getcart);

router.post("/orderfood",authmiddleware,Placeorder);

router.post("/verify",verifyorder);

router.post("/listorder",authmiddleware,userorders);

router.get("/listadmin",listorders);

router.post("/updatestatus",updatestatus);

module.exports=router;