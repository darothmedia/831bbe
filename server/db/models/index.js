const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Participant = require("./participant")

// associations

User.belongsToMany(Conversation, { through: Participant });
Conversation.belongsToMany(User, { through: Participant });
// Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message
};
