const express=require('express');
const router=express.Router();
const {createUser,loginUser,getUser,resetPasswordPin,updatePassword,logoutUser} = require('../model/userModel');
const {validateToken} = require("../middleware/validateTokenHandler");
const {resetPassReqValidation,updatePassValidation} = require("../middleware/formValidationMiddlware");

router.all("/",(req,res,next)=>{
    
    next();
})

router.post("/",createUser);
router.get("/",validateToken,getUser);
router.post("/login",loginUser);
router.post("/reset-password",resetPassReqValidation,resetPasswordPin);
router.patch("/reset-password",updatePassValidation,updatePassword);
router.delete("/logout",validateToken,logoutUser)




module.exports = router;