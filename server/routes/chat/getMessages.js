const express = require('express');
const router = express.Router();
const Message = require('../../models/chatSchema');
const User = require('../../models/userSchema');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../../middleware/fetchUser');

//get particular user chat messages
router.get('/chat', fetchUser, async (req, res) => {
    
    //checking if user exists in db
    const userExists = await Message.findOne( {user: req.user.id} );
    if (!userExists) {
        return res.status(404).json({ error: "Unauthorized access" });
    }

   res.status(200).json(userExists.messages);

})

module.exports = router;