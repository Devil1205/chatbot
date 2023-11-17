const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
app.use(express.json());
app.use(cors());

//database connection
require('./db/connection');

//setting socket.io server
const io = new Server(server,{
    cors: {
        origin: "*",
    }
});

module.exports = io;

// require('./openai.js')

//socket
require('./socket/socket');
//Routes
app.use('/chatbotAuthAPI',require('./routes/user/createUser'));
app.use('/chatbotAuthAPI',require('./routes/user/loginUser'));
app.use('/chatbotAuthAPI',require('./routes/user/verifyUser'));
app.use('/chatbotMessageAPI',require('./routes/chat/addMessage'));
app.use('/chatbotMessageAPI',require('./routes/chat/getMessages'));

server.listen(port,()=>{
    console.log("Listenting on port "+port);
})