import React from "react";
import { Box, Badge, Avatar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  profilePic: {
    height: 44,
    width: 44,
  },
  badge: {
    height: 13,
    width: 13,
    borderRadius: "50%",
    border: "2px solid white",
    backgroundColor: "#D0DAE9",
  },
  online: {
    backgroundColor: "#1CED84",
  },
  sidebar: {
    marginLeft: 17,
  },
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

const UserAvatar = ({ sidebar, username, photoUrl, online }) => {
  const classes = useStyles();

  return (
    <Box className={sidebar ? classes.sidebar : ''}>
      <Badge
        classes={{ badge: `${classes.badge} ${online && classes.online}` }}
        variant="dot"
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        overlap="circular"
      >
        <Avatar alt={username} src={photoUrl} className={classes.profilePic} />
      </Badge>
    </Box>
  );
};


export default UserAvatar;
