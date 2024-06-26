const express=require('express');
const router=express.Router();

router.all("/",(req,res,next)=>{
    return res.json({
        message:"this is tickets router"
    })
})

module.exports = router;