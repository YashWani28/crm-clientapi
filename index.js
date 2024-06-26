require("dotenv").config();
const express = require('express');
const app = express();
const cors=require('cors');
const bodyParser=require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const { errorHandler } = require("./middleware/errorHandler");

const port = process.env.PORT || 3001;

const connectDb = require('./config/connectDb');
connectDb();


app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/v1/users",require("./routers/userRouter"));
app.use("/v1/tickets",require("./routers/ticketRouter"));
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`Server listening on port http://localhost:${port}...`);
});