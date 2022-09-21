import React, { useEffect, useState } from "react";
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
import SearchFriend from "./searchFriend";
import TabComp from "./tabs";
import { TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { getUserList } from "../endpoint";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
    backgroundColor: "beige",
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
  searchExpand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  searchExpandOpen: {
    transform: "rotate(180deg)",
  },

  avatar: {
    backgroundColor: "#1acaca",
  },
  cardContent: {
    maxHeight: 200,
    overflowY: "auto",
    marginTop: 10,
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState("friends");

  const [searchExpanded, setSearchExpanded] = useState(false);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const [searchFilterObj, setSearchFilterObj] = useState({});
  const debouncedSearchFilterObj = useDebounce(searchFilterObj);
  const [onLoad, setOnLoad] = useState(false);
  const [userList, setUserList] = useState({ data: [], hasMore: false });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const navigateToLogin = () => {
    // 👇️ navigate to /contacts
    navigate("/");
  };
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSearchExpand = () => {
    setSearchExpanded(!searchExpanded);
  };

  useEffect(() => {
    if (onLoad) {
      onSearch(searchFilterObj);
    } else setOnLoad(true);
  }, [debouncedSearchFilterObj]);

  const onSearch = (obj) => {
    getAllData(obj);
  };

  const tabs = [
    {
      label: "Friends",
      component: (
        <>
          <FriendsListCard />
          <FriendsListCard />

          <FriendsListCard />
        </>
      ),
      key: "friends",
    },

    {
      label: "Friend Request",
      component: (
          <FriendsRequestCard loginUser={userData}/>
      ),
      key: "friends-request",
    },
    {
      label: "Suggestions",
      component: (
        <>
          <SuggestionCard />
          <SuggestionCard />
          <SuggestionCard />
        </>
      ),
      key: "suggestion",
    },
  ];



  const getAllData = (obj) => {
    setUserList({ ...userList, hasMore: false });
    setLoading(true);
    let query = {
      $limit: 4,
      $skip: 0,
      name: obj && obj.name ? obj.name : "",
    };
    getUserList(query).then((response) => {
      setUserList({
        data: [...response.data],
        hasMore: response.total > response.limit + response.skip,
      });
      setLoading(false);
    });
  };
  const handleLogout = () => {
    console.log('fired');
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigateToLogin();
  };

  const handleViewMore=()=>{
    setUserList({ ...userList, hasMore: false });
    setLoading(true);
    let query = {
      $limit: 4,
      $skip: userList.data.length,
    };
    getUserList(query).then((response) => {
      setUserList({
        data: [...userList.data,...response.data],
        hasMore: response.total > response.limit + response.skip,
      });
      setLoading(false);
    });
  };
  useEffect(() => {
    if (!userList.data.length) getAllData();
  }, []);

  console.log("userList.hasMore", userList.hasMore);
  console.log("!loading", !loading);
  console.log("!!userList.data.length", !!userList.data.length);
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {userData &&
              userData.firstName &&
              userData.firstName[0].toUpperCase()}
          </Avatar>
        }
        title={`${
          userData &&
          userData.firstName &&
          userData.firstName[0].toUpperCase() + userData.firstName.slice(1)
        } ${
          userData &&
          userData.lastName &&
          userData.lastName[0].toUpperCase() + userData.lastName.slice(1)
        }`}
        subheader={userData && userData.createdAt}
        action={
          <Button
            style={{
              backgroundColor: "#1acaca",
              marginTop: 10,
              marginBottom: 10,
              color: "white",
              fontSize: "15px",
            }}
            onClick={() => handleLogout()}
          >
            LOGOUT
          </Button>
        }
      />
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.searchExpand, {
            [classes.searchExpandOpen]: searchExpanded,
          })}
          onClick={handleSearchExpand}
          aria-expanded={searchExpanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={searchExpanded} timeout="auto" unmountOnExit>
        <div
          style={{
            padding: 10,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Find friend"
            variant="outlined"
            style={{ marginTop: 10, marginBottom: 15 }}
            value={searchFilterObj.name}
            onChange={(event) => {
              setSearchFilterObj({ name: event.target.value });
            }}
          />
          <div style={{ maxHeight: 300, overflowY: "auto", marginTop: 10 }}>
            {userList && userList.data.length
              ? userList.data.map((item, index) => (
                  <SearchFriend key={index} item={item} loginUser={userData}/>
                ))
              : null}
          </div>
          {userList.hasMore && !loading && !!userList.data.length && (
            <div style={{ textAlign: "center" }}>
              <Button
                style={{
                  backgroundColor: "#1acaca",
                  marginTop: 10,
                  marginBottom: 10,
                  color: "white",
                  fontSize: "15px",
                }}
                onClick={handleViewMore}
              >
                View More
              </Button>
            </div>
          )}
        </div>
      </Collapse>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <TabComp tabList={tabs} handleChange={handleChange} value={value} />
      </Collapse>
    </Card>
  );
}
