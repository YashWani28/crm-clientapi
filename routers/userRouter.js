const express=require('express');
const router=express.Router();
const {createUser,loginUser} = require('../model/userModel');

router.all("/",(req,res,next)=>{

    next();
})

router.post("/",createUser);
router.post("/login",loginUser);




module.exports = router;