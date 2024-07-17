const express=require('express');
const router=express.Router();
const {validateRefreshToken}=require("../middleware/validateTokenHandler");
const { crateAccessJWT } =require("../helpers/jwtHelper");
const User = require("../model/usersSchema");

router.get("/",validateRefreshToken,async(req,res)=>{
    const email=req.user.email;
    const user =await User.findOne({email});
    const tokenInDB = user.refreshJWT.token;
    // const timeInDB = user.refreshJWT.addedAt;
    const sentrefreshtoken=req.refreshtoken;           
    // const today=new Date();
    // //! implement the time difference and validity logic here
    
    // console.log(today-timeInDB.getDate())
    if(tokenInDB===sentrefreshtoken){
        const accessToken=await crateAccessJWT(email);
        res.json({"message":"success",accessToken});
    }
    else{
        res.status(401).json({"message":"Token invalid or expired"});
        // await User.findOneAndUpdate(
        //     { email },
        //     {
        //         $set: {
        //             "refreshJWT.token": refreshJWT,
        //             "refreshJWT.addedAt": Date.now()
        //         }
        //     },
        //     { new: true }
        // );
    }
    
})

module.exports = router;