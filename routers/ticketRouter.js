const express=require('express');
const router=express.Router();
const {validateToken}=require("../middleware/validateTokenHandler");
const {createTicket,getAllTickets,getticket,updateMessage,closeTicket}=require("../model/ticketModel")

router.all("/",(req,res,next)=>{
    next();
})

router.post("/newticket",validateToken,createTicket);
router.get("/alltickets",validateToken,getAllTickets);
router.get("/:id",validateToken,getticket);
router.patch("/:id",validateToken,updateMessage);
router.patch("/close/:id",validateToken,closeTicket)

module.exports = router;