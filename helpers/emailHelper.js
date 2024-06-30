const nodemailer = require("nodemailer");
const {HTML_TEMPLATE} = require("../utils/resetPasswordMailTemplate");
const {HTML_TEMPLATE_Success} = require("../utils/resetPasswordSuccess");

require("dotenv").config();



const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

const send = async (pin,email) => {
    try {
        const mailDetails = {
            from:"proprogramming28@gmail.com",
            to:email,
            subject:"CRM - Reset your Password",
            text:`${pin}`,
            html:HTML_TEMPLATE(`${pin}`)
        }
        const info = await transporter.sendMail(mailDetails)
        return info;
    } catch (error) {
       throw error;
    } 
  };


  const sendsuccess = async (email) => {
    try {
        const mailDetails = {
            from:"proprogramming28@gmail.com",
            to:email,
            subject:"CRM - Password Updated successfully",
            text:"",
            html:HTML_TEMPLATE_Success()
        }
        const info = await transporter.sendMail(mailDetails)
        return info;
    } catch (error) {
       throw error;
    } 
  };
module.exports={send,sendsuccess};