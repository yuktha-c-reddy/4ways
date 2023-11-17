const express= require('express');
const bodyParser = require('body-parser');
const cors= require('cors');
const uploadRouter = require('./router/uploadRouter');
const uploadNode = require('./router/uploadNode');

const server=express();

server.use(bodyParser.json({ limit: '50mb' }));
server.use(cors({"origin": "*"}))
server.use(express.json());

server.use("/upload",uploadRouter);
server.use("/uploadNodes",uploadNode)

server.listen(8080,()=>{
    console.log("server listening on port 8080");
})