const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");
const Participant = require("./participant");
const User = require("./user");

const Conversation = db.define("conversation", {
});

// find conversation given a list of user IDs

Conversation.findConversation = async function (userIds) {
  const conversations = await Conversation.findAll({
    attributes: ["id"],
    where: {
      '$users.id$': {
        [Op.in]: userIds
      }
    },
    include: [
      {model: User, as: User.tableName}
    ]
  });

  const filtered = conversations.filter(conversation => 
    conversation.users.length === userIds.length)
  
  // return conversation or null if it doesn't exist
  return filtered.length ? filtered : null;
};

module.exports = Conversation;
