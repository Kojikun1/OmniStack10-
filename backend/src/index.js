const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require("http");
require('dotenv').config();

const router = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(process.env.MONGODB_ACCESS,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(cors());

app.use(express.json());

app.use(router)

app.get("/", (req,res)=> {
    res.json({message: "Hello Wold"});
})


server.listen(3333);