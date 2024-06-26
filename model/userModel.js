const User = require("../model/usersSchema");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const {crateAccessJWT} = require("../helpers/jwtHelper");

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

module.exports = { createUser,loginUser };
