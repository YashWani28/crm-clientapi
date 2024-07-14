const express=require('express');
const router=express.Router();
const {validateToken}=require("../middleware/validateTokenHandler");
const {createTicket,getAllTickets,getticket,updateMessage,closeTicket}=require("../model/ticketModel")
const{createTicketValidation,replyTicketMessageValidation}=require("../middleware/formValidationMiddlware")

router.all("/",(req,res,next)=>{
    next();
})

router.post("/newticket",createTicketValidation,validateToken,createTicket);
router.get("/alltickets",validateToken,getAllTickets);
router.get("/:id",validateToken,getticket);
router.patch("/:id",replyTicketMessageValidation,validateToken,updateMessage);
router.patch("/close/:id",validateToken,closeTicket)

module.exports = router;