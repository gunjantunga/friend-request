import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FriendsListCard from "./friendsListCard";
import FriendsRequestCard from "./friendRequestCard";
import SuggestionCard from "./suggestions";
import Button from "@material-ui/core/Button";
import TabComp from "./tabs";
import { sendNewFriendRequest } from "../endpoint";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 70,
    marginBottom: 15,
  },

  avatar: {
    backgroundColor: "#1acaca",
  },
  cardContent: {
    maxHeight: 200,
    overflowY: "auto",
    marginTop: 10,
  },
  container:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'
  }
}));

export default function SearchFriend({item,loginUser}) {
 

  const classes = useStyles();
  const [requestSent,setRequestSent] = useState(false);

  const handleRequestSend = (user) => {
    let data = {
      fromUser:loginUser?loginUser._id:null,
      toUser:user?user._id:null,
      status:0,
      deleted:false
    };

    sendNewFriendRequest(data).then((response)=>{
      console.log('after',response);
      setRequestSent(!requestSent);
    })
  };

  return (
    <Card className={classes.root}>
      <div className={classes.container}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {item &&
              item.firstName &&
              item.firstName[0].toUpperCase()}
            </Avatar>
          }
          title={`${
            item &&
            item.firstName &&
            item.firstName[0].toUpperCase() + item.firstName.slice(1)
          } ${
            item &&
            item.lastName &&
            item.lastName[0].toUpperCase() + item.lastName.slice(1)
          }`}          
          subheader={item && item.createdAt}
          />
        <Button
          onClick={() => handleRequestSend(item)}
          variant="contained"
          style={{ color: "white", backgroundColor: requestSent?'#bfbfbf':'#1acaca',height:30,marginRight:10 }}
        >
          {requestSent?'Cancel':'Send'}
        </Button>

      </div>
    </Card>
  );
}
