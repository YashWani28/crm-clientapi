const jwt = require("jsonwebtoken");
const User = require('../model/usersSchema');

const crateAccessJWT = async (email, _id) => {
    try {
        const accessJWT = await jwt.sign({user:{"email": email }}, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "15m", //change this to 15m
        });

       
        return accessJWT;
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const createRefreshJWT = async (email, _id) => {
    try {
        const refreshJWT = await jwt.sign(
            { user: { email } },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        await User.findOneAndUpdate(
            { email },
            {
                $set: {
                    "refreshJWT.token": refreshJWT,
                    "refreshJWT.addedAt": Date.now()
                }
            },
            { new: true }
        );

        return refreshJWT;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};




module.exports = {
    crateAccessJWT,
    createRefreshJWT
}