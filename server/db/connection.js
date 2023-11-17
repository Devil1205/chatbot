const mongoose = require('mongoose');
require('dotenv').config();
// const URI = "mongodb://localhost:27017/chatbot";
const URI = process.env.MONGO;
mongoose.connect(URI).then(console.log("connected to mongo")).catch(e=>{console.log(e)});