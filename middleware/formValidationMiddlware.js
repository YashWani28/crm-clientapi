const Joi = require("joi");
const asyncHandler = require("express-async-handler");


const email = Joi.string().email({
	minDomainSegments: 2,
	tlds: { allow: ["com", "net"] },
});
const pin = Joi.number().min(10000).max(999999).required();
const newPassword = Joi.string().min(3).max(30).required();
const shortStr = Joi.string().min(2).max(50);
const longStr = Joi.string().min(2).max(1000);


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

const createTicketValidation = asyncHandler(async(req,res,next)=>{
	const schema = Joi.object({
		issue: Joi.string().min(2).max(150).required(),
		desc: longStr.required(),
		feedback:longStr.required(),
		
	});


	const value = schema.validate(req.body);

	if (value.error) {
		return res.json({ status: "error", message: value.error.message });
	}

	next();
});

const replyTicketMessageValidation = (req, res, next) => {
	const schema = Joi.object({
		sentby: Joi.string().min(5).max(6).required(),//5-->admin;6-->client
		messagebody: longStr.required(),
	});

	
	const value = schema.validate(req.body);

	if (value.error) {
		return res.json({ status: "error", message: value.error.message });
	}

	next();
};

module.exports={
    resetPassReqValidation,
    updatePassValidation,
	createTicketValidation,
	replyTicketMessageValidation
}