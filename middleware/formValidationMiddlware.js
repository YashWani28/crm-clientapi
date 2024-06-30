const Joi = require("joi");
const asyncHandler = require("express-async-handler");


const email = Joi.string().email({
	minDomainSegments: 2,
	tlds: { allow: ["com", "net"] },
});
const pin = Joi.number().min(10000).max(999999).required();
const newPassword = Joi.string().min(3).max(30).required();


const resetPassReqValidation = asyncHandler(async(req, res, next) => {
	const schema = Joi.object({ email });

	const value = schema.validate(req.body);
	if (value.error) {
        throw new Error(value.error.message);
		
    }
	next();
});

const updatePassValidation = asyncHandler(async(req, res, next) => {
	const schema = Joi.object({ email, pin, newPassword });

	const value = schema.validate(req.body);
	if (value.error) {
        throw new Error(value.error.message);
		
    }
	next();
});

module.exports={
    resetPassReqValidation,
    updatePassValidation
}