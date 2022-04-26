const router = require("express").Router();
const { User, Conversation, Message, Participant } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;

    const conversations = await Conversation.findAll({
      where: {
        '$users.id$': userId
      },
      attributes: ["id"],
      order: [[Message, "createdAt", "ASC"]],
      include: [
        { model: Message, order: ["createdAt", "ASC"] },
        { model: User, as: User.tableName, through: {
          where: {
            userId: userId
          }
        }}
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      //find all Users in a given Conversation
        const users = await User.findAll({
          where: {
            '$conversations.id$': convo.id,
            [Op.not]: {
              id: userId
            }
          },
          attributes: ["id", "username", "photoUrl"],
          include: [
            { model: Conversation, as: Conversation.tableName}
          ],
        })

      if (users) {
        users.map(user => user.toJSON())
        convoJSON.otherUser = users[0];
        convoJSON.fullUserList = users;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      const messages = convoJSON.messages
      convoJSON.latestMessageText = messages[messages.length - 1].text;
      conversations[i] = convoJSON;
    }
    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
