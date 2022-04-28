const router = require("express").Router();
const { Conversation, Message, User } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender, participants } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }

    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation([
      senderId,
      recipientId
    ]);

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({});

      for (let id of participants){
        const user = await User.findOne({
          where: { id: id }
        })
        await conversation.addUser(user)
      }
      
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }

    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.patch('/read', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    } else if (!req.body.id) {
      return null;
    };

    const {id, otherUser, unreads} = req.body

  
    const messages = await Message.update({read: true}, {
      where: {
        read: false,
        senderId: otherUser.id,
        conversationId: id
      }
    });

    res.json({id, otherUser, unreads});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
