import React from "react";
import { Box, Badge, Avatar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  chatPic: {
    height: 20,
    width: 20,
  },
  chat: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10
  }
}));

export const ReadAvatar = ({ username, photoUrl }) => {
  const classes = useStyles();

  return (
    <Box className={classes.chat}>
      <Badge
        classes={{ badge: `${classes.chat}` }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        overlap="circular"
      >
        <Avatar 
          alt={username} 
          src={photoUrl} 
          className={classes.chatPic} />
      </Badge>
    </Box>
  );
};

export default ReadAvatar;