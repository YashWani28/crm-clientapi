const User = require("../model/usersSchema");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const {crateAccessJWT} = require("../helpers/jwtHelper");
const {setPasswordResetPin,getPasswordResetPin,deletePasswordResetPin} = require("../model/resetPinModel");
const {send,sendsuccess} = require("../helpers/emailHelper");
const isWithinTimeDifferenceT = require("../utils/checkTimeDifference");

const createUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    // Check if the user already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the level of salting
    
    // Create the new user
    const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
    });
    console.log(newUser);

    console.log(`User created ${newUser}`);
    
    if (newUser) {
        res.status(201).json({ "_id": newUser.id, "email": newUser.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

const loginUser = asyncHandler(asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Either username or password missing");
    }
    
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){

        const accessJWT = await crateAccessJWT(user.email);    

        res.json({
            message: "Login Successfully!",
            accessJWT,
            }
        )

    }
    else{
        res.status(401);
        throw new Error("Email or Passwod is incorrect");
    }


}));

const getUser = asyncHandler(async(req,res)=>{
    const email=req.user.email;
    const user = await User.findOne({email});
    if(!user){
        res.status(404);
        throw new Error("User not found!!");
    }
    res.json(user);
});

const resetPasswordPin = asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const user=await User.findOne({email});
    if(!user)
    {
        res.status(404);
        throw new Error("User not found");
    }
    const setPin = await setPasswordResetPin(email);
    try{
        const info = await send(setPin.pin,email);
        //console.log(info);
        res.json({"message":"Reset pin is sent to your registered email Id"});
        
    }
    catch(err){
        console.log(err);
        res.status(500);
        throw new Error("Could not send reset pin");
    }
});

const updatePassword = asyncHandler(async(req,res)=>{
    //email,newpassword,pin
    const{email,newpassword,pin}=req.body;
    const user=await User.findOne({email});
    if(!user)
    {
        res.status(404);
        throw new Error("User not found");
    }
    pinInDb=await getPasswordResetPin(email);
    if(pinInDb.pin===parseInt(pin))
    {
        
        addedat=pinInDb.addedAt;
        console.log(addedat);
        now=Date.now();
        if(isWithinTimeDifferenceT(addedat,now,10)){
            const newpass = await bcrypt.hash(newpassword, 10);
            
            await User.findOneAndUpdate({email},{password:newpass},{new:true})
            res.status(201).json({"message":"Password updated successfully"});
            await sendsuccess(email);
            await deletePasswordResetPin(email);
        }
        else{
            res.status(401);
            throw new Error("Pin expired");
        }
    }
    else{
        res.status(401);
        throw new Error("Invalid pin");
    }



});

const logoutUser = asyncHandler(async(req,res)=>{
    const{email}=req.user;
    const user = await User.findOne({email});
    if(!user)
    {
        res.status(404);
        throw new Error("User does not exist!");
    }
    res.json({"message":'you will be automatically logged out once your token expires'})

});

module.exports = { createUser,loginUser,getUser,resetPasswordPin,updatePassword,logoutUser };
