const asyncHandler = require("express-async-handler");
const resetPin = require("../model/resetPinSchema");
const {generateRandom} = require("../utils/randomGenerator");

const setPasswordResetPin = asyncHandler(async(email) =>{
    // come up with random pin
    await resetPin.findOneAndDelete({email});
    
    const randPin=generateRandom();
    const restObj = {
        email,
        pin: randPin,
    };
    try{
        const pinobj = await resetPin.create(restObj);
        console.log(pinobj);
        return pinobj;
    }    
    catch(error){
        throw new Error("cannot set rest pin at the moment");
    }
});


const getPasswordResetPin = asyncHandler(async(email)=>{
    const pin=await resetPin.findOne({email});
    return pin;
})

const deletePasswordResetPin =asyncHandler(async(email)=>{
    await resetPin.findOneAndDelete({email});
})


module.exports = {
    setPasswordResetPin,
    getPasswordResetPin,
    deletePasswordResetPin
}