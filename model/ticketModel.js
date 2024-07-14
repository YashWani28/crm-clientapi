const mongoose=require("mongoose");
const Ticket = require("./ticketSchema");
const User = require("./usersSchema");
const asyncHandler = require("express-async-handler");

const createTicket=asyncHandler(async(req,res)=>{
    const{issue,desc,feedback}=req.body;
    const email=req.user.email;
    const user=await User.findOne({email});
    if(!user){
        res.status(404);
        throw new Error("No user found");
    }
    const ticketobj={
        clientId:user._id,
        clientEmail:email,
        issue:issue,
        desc:desc,
        feedback:feedback,
        messagehistory:[
            {
                sentby:"client",
                messagebody:desc,
            },
        ],
    };
   
    try {
        const ticket = await Ticket.create(ticketobj);
        res.status(201).json({ message: "Ticket created successfully", ticket });
    } catch (error) {
        res.status(500);
        throw new Error("unable to create ticket at the moment");
    }
})

const getAllTickets=asyncHandler(async(req,res)=>{
    const email=req.user.email;
    const user=await User.findOne({email});
    if(!user){
        res.status(404);
        throw new Error("No user found");
    }
    const id=user._id;
    //console.log(id);
    try{
        const tickets=await Ticket.find({clientId:id});
       // console.log(tickets)
        res.json(tickets);

    }catch(error)
    {
        res.status(500)
        throw new Error("not able to fetch tickets at the moment");
    }
})
        
const getticket = asyncHandler(async (req, res) => {
    const { id } = req.params;
    //* set up JOI middleware to handle this
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid ticket ID");
    }
    const ticket = await Ticket.findOne({ _id: id });
    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
    } else {
        res.json(ticket);
    }
});

//? ADMIN WILL ALSO USE THE SAME ROUTE TO REPLY 
const updateMessage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { sentby, messagebody } = req.body;
    const ticket=await Ticket.findOne({_id:id});
    if(ticket && ticket.status==="Issue Resolved")
    {
        res.status(403);
        res.json({"message":"This ticket is closed. Please open a new ticket"})
        return;
    }
    try {
        console.log("hi");
        const updatedTicket = await Ticket.findOneAndUpdate(
            { _id: id },
            {
                status: "In Resolution",
                $push: {
                    messagehistory: { sentby, messagebody },
                },
            },
            { new: true }
        );

        if (!updatedTicket) {
            res.status(404);
            throw new Error("Ticket not found");
        }

        res.json(updatedTicket);
    } catch (error) {
        const statusCode = error.status || 500;
        res.status(statusCode);
        res.json({ message: error.message });
    }
});

const closeTicket = asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try {
        const updatedTicket = await Ticket.findOneAndUpdate(
            { _id: id },
            {
                status: "Issue Resolved",
            },
            { new: true }
        );

        if (!updatedTicket) {
            res.status(404);
            throw new Error("Ticket not found");
        }

        res.json({"message":"Ticket closed successfully"});
    } catch (error) {
        const statusCode = error.status || 500;
        res.status(statusCode);
        res.json({ message: error.message });
    }
    
});

module.exports={
    createTicket,
    getAllTickets,
    getticket,
    updateMessage,
    closeTicket
}