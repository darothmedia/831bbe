import React from 'react';
import { Box } from '@material-ui/core';
import { ReadAvatar } from '../Sidebar/BadgeAvatar';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId, lastRead } = props;

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

          if (message.senderId === userId) {
            return (
              <Box key={message.id}>
                <SenderBubble
                  key={message.id}
                  text={message.text}
                  time={time} />
                {lastRead === message.id ? 
                  <ReadAvatar
                    sidebar={false}
                    username={otherUser.username}
                    photoUrl={otherUser.photoUrl} /> 
                  : null }
              </Box>
            );
          } else {
            return (
              <OtherUserBubble
                key={message.id}
                text={message.text}
                time={time}
                otherUser={otherUser} />
            );
          };
      })}
    </Box>
  );
};

export default Messages;
