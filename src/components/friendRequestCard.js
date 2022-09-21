import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { allFriendRequest } from "../endpoint";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 70,
    marginBottom: 15,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#1acaca",
  },
  btn: {
    display: "flex",
    justifyContent: "space-around",
    padding: 10,
  },
}));

export default function FriendsRequestCard({loginUser}) {
  const classes = useStyles();
  const [friendRequestListData, setFriendRequestListData] = useState({
    data: [],
    hasMore: false,
  });
  const [loading,setLoading] = useState(false);


  const getAllRequestData = () => {
    setFriendRequestListData({ ...friendRequestListData, hasMore: false });
    setLoading(true);
    let query = {
        toUser:loginUser?loginUser._id:null,
        status:0,
        $limit:4,
        $skip:friendRequestListData.data.length
    };
    allFriendRequest(query).then((response) => {
      console.log("after all friend request", response);
    });
  };

  useEffect(()=>{
    getAllRequestData();
  },[]);

  const handleAcceptRequest = () => {};

  const handleRejectRequest = () => {};
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            G
          </Avatar>
        }
        title="Gunjan Kumar Tunga"
        subheader="September 14, 2016"
      />
      <div className={classes.btn}>
        <Button
          onClick={() => handleAcceptRequest()}
          variant="contained"
          style={{ color: "white", backgroundColor: "#1acaca" }}
        >
          Accept
        </Button>
        <Button onClick={() => handleRejectRequest()} variant="contained">
          Reject
        </Button>
      </div>
    </Card>
  );
}
