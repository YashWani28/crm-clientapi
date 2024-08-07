const {constants} = require("../utils/constants");
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode)
    {
        case constants.VALIDATION_ERROR:
            res.json({title: "Validation failed",message:err.message,stackTrace: err.stack})
            break;
        case constants.NOT_FOUND:
            res.json({title: "Not found",message:err.message,stackTrace: err.stack})
            break;
        case constants.UNAUTHORIZED:
            res.json({title: "Unauthorized",message:err.message,stackTrace: err.stack})
            break;
        case constants.FORBIDDEN:
            res.json({title: "forbidden",message:err.message,stackTrace: err.stack})
            break;    
        case constants.SERVER_ERROR:
            res.json({title: "internal server error",message:err.message,stackTrace: err.stack})
            break;
        default:
            console.log({title:"other error: ",message:err.message});
            res.status(500).json({title:"not able to perform operation at the current moment"});

            break;
    }
};

module.exports = {errorHandler};