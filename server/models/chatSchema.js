const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        messages: [{
            content: String,
            mType: String,
        }],
    })
module.exports = mongoose.model('Chat', ChatSchema);