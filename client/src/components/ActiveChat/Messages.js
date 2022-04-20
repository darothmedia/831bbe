import React from 'react';
import { Box } from '@material-ui/core';
import { ReadAvatar } from '../Sidebar/BadgeAvatar';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  var lastRead;

  for (let message of messages){
    if (message.read && message.senderId !== otherUser.id) lastRead = message;
  }

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');
        if (message.senderId){
          if (lastRead.id === message.id) {
            return (
              <div key={message.id}>
                <SenderBubble
                  key={message.id}
                  text={message.text}
                  time={time} />
                <ReadAvatar
                  sidebar={false}
                  username={otherUser.username}
                  photoUrl={otherUser.photoUrl}>
                </ReadAvatar> 
              </div>
            )
          } else if (message.senderId === userId)  {
            return (
            <SenderBubble
              key={message.id}
              text={message.text}
              time={time} />
          )
          } else return (
            <OtherUserBubble
              key={message.id}
              text={message.text}
              time={time}
              otherUser={otherUser}
            />
          );
        }
        return null;
      })}
    </Box>
  );
};

export default Messages;
