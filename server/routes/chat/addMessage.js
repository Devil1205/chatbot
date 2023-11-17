const express = require('express');
const router = express.Router();
const Message = require('../../models/chatSchema');
const User = require('../../models/userSchema');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../../middleware/fetchUser');
const main = require('../../openai');

const saveMessage = async (userId, content, type) => {
    //calling api for sender message
    const findChat = await Message.findOne({ user: userId });
    // console.log(findChat);
    if (findChat === null) {
        const message = new Message({
            user: userId,
            messages: [{
                content: content,
                mType: type
            }]
        });
        try {
            await message.save();
            return true;
        }
        catch (e) {
            // console.log(e);
            return false;
        }
    }
    else {
        findChat.messages.push({ content: content, mType: type });
        findChat.save();
        return true;
    }
}

router.post('/send', fetchUser, [
    body('type', "Invalid message type").isLength({ min: 1 }),
    body('content', "Cannot send empty message").isLength({ min: 1 }),
], async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { content, type } = req.body;
    const id = req.user.id;

    const user = await User.findById(req.user.id);
    if (!user)
        return res.status(404).json({ messgae: "Unauthorized access" });

    //storing message in the db
    const storeMessage = await saveMessage(id, content, type);
    if (storeMessage === true) {
        const response = await main(content);
        await saveMessage(id, response.content, 'received');
        return res.status(200).json({ message: "Chat saved successfully" })
    }
    return res.status(500).json({ message: "Internal Server Error" })
})

module.exports = router;