const jwt = require("jsonwebtoken");


const crateAccessJWT = async (email, _id) => {
    try {
        const accessJWT = await jwt.sign({user:{"email": email }}, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "7d", //change this to 15m
        });

       
        return accessJWT;
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
};



module.exports = {
    crateAccessJWT,

}