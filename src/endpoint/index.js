import axios from "axios";
import { serializeObjectToQuery } from "../Util/helper";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
};
export const createNewUser = async (data) => {
  return await axios
    .post("http://localhost:3030/users", data)
    .then((response) => {
      return response.data;
    });
};

export const loginUser = async (data) => {
  return await axios
    .post("http://localhost:3030/authentication", data)
    .then((response) => {
      return response.data;
    });
};

export const getUserList = async (query) => {
  return await axios
    .get(`http://localhost:3030/users${serializeObjectToQuery(query)}`, {
      headers: headers,
    })
    .then((response) => {
      console.log("search", response);
      return response.data;
    });
};

export const sendNewFriendRequest = async (data) => {
  return await axios
    .post("http://localhost:3030/request", data, { headers: headers })
    .then((response) => {
      console.log("sendNewFriendRequest", response);
    });
};

export const cancelFriendRequest = async (data) => {
  return await axios
    .patch("http://localhost:3030/request", data, { headers: headers })
    .then((response) => {
      console.log("cancelFriendRequest", response);
    });
};

export const allFriendRequest = async (query) => {
  return axios
    .get(`http://localhost:3030/request${serializeObjectToQuery(query)}&$populate=fromUser`, {
      headers: headers,
    })
    .then((response) => {
        console.log('allFriendRequest',response);
    });
};
