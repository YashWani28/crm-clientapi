const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/usersSchema");

const validateToken = asyncHandler(async(req,res,next) => {
    let token;
    
    // while sending requests from client, create Authorization header in headers and add the jwt token as its value
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token = authHeader.split(" ")[1];
        // verify needs the token, the secret key and a call back function
        jwt.verify(token,process.env.JWT_ACCESS_SECRET,(err,decoded)=>{
            if(err)
            {
                res.status(401);
                if(err.name==='TokenExpiredError')
                {
                    throw new Error("Session Expired. Please log in again");
                }
                throw new Error("User is not authorized");

            }
            // req.user makes this information accessible to downstream middleware or route handlers.
            // By doing this, subsequent route handlers or middleware in the request-response cycle can easily access the user information without having to re-parse the JWT.
            req.user = decoded.user;
            next();
        });
        if(!token)
        {
            res.status(401);
            throw new Error("Token is missing")
        }
    }
})


const validateRefreshToken = asyncHandler(async (req, res, next) => {
    let token;

    // Extract the Authorization header from the request
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        try {
       
            const decoded = await new Promise((resolve, reject) => {
                jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(decoded);
                });
            });

            req.user = decoded.user;
            req.refreshtoken = token;
            next();
        } catch (err) {
            res.status(401);
            if (err.name === 'TokenExpiredError') {
                let decoded = jwt.decode(token);
                let email = decoded.user.email;
               // console.log(decoded);

                await User.findOneAndUpdate(
                    { email },
                    {
                        $set: {
                            "refreshJWT.token": "",
                            "refreshJWT.addedAt": Date.now()
                        }
                    },
                    { new: true }
                );

                throw new Error("Session Expired. Please log in again.");
            } else {
                throw new Error("Invalid token.");
            }
        }
    } else {
        res.status(401);
        throw new Error("Token is missing");
    }
});

module.exports = {validateToken,validateRefreshToken};