import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import RadioButtonGroup from "./components/radioGroup";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "./endpoint";

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: 400,
    minHeight: 400,
    backgroundColor: "beige",
    borderRadius: 8,
    padding: 15,
  },
  textField: {
    height: "30px",
  },
  error: {
    color: "red",
    marginTop: "3px",
    marginBottom: "3px",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [selectedEditObj, setSelectedEditObj] = useState({});

  const [errorObj, setErrorObj] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    let errorList = {};

    if (!selectedEditObj.firstName) {
      errorList.firstName = "Please provide your first name .";
    }
    if (!selectedEditObj.lastName) {
      errorList.lastName = "Please provide a last name .";
    }
    if (!selectedEditObj.email) {
      errorList.email = "Please provide your email .";
    }
    if (!selectedEditObj.gender) {
      errorList.gender = "Please select your gender .";
    }
    if (!selectedEditObj.password) {
      errorList.password = "Please give your password .";
    }

    if (Object.keys(errorList).length == 0) {
      setErrorObj({});
      return true;
    } else {
      setErrorObj(errorList);
      errorList = {};
      return false;
    }

    console.log(errorList);
  };

  const navigateToLogin = () => {
    navigate("/");
  };
  const handleSignUp = () => {
    if (!validateForm()) return;
    console.log("fired");
    createNewUser(selectedEditObj).then((response) => {
      setSelectedEditObj({});
      if (response) {
        navigateToLogin();
      }
    }).catch((error)=>{
      if(error){
        setErrorObj({
          ...errorObj,
          email : error.response.data.message
        })
      }
    })
  };

  const handleLogin = () => {
    navigateToLogin();
  };
  const updateValue = (obj) => {
    console.log(obj);
    setSelectedEditObj({ ...selectedEditObj, ...obj });
  };
  console.log("select", selectedEditObj);
  return (
    <div className={classes.container}>
      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#1acaca",
          padding: 0,
        }}
      >
        Sign-Up
      </p>
      <div style={{ display: "flex", paddingTop: 10, paddingBottom: 10 }}>
        <div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="First and middle name"
            value={selectedEditObj.firstName}
            onChange={(e) => {
              updateValue({ firstName: e.target.value });
            }}
            style={{ paddingRight: 10 }}
          />
          <p className={classes.error}>{errorObj.firstName}</p>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Last name"
            value={selectedEditObj.lastName}
            onChange={(e) => {
              updateValue({ lastName: e.target.value });
            }}
          />
          <p className={classes.error}>{errorObj.lastName}</p>
        </div>
      </div>
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="Email"
        style={{ width: "100%" }}
        value={selectedEditObj.email}
        onChange={(e) => {
          updateValue({ email: e.target.value });
        }}
      />
      <p className={classes.error}>{errorObj.email}</p>
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="Password"
        style={{ width: "100%", paddingTop: 10 }}
        value={selectedEditObj.password}
        onChange={(e) => {
          updateValue({ password: e.target.value });
        }}
      />
      <p className={classes.error}>{errorObj.password}</p>
      <div style={{ marginTop: 10 }}>
        <RadioButtonGroup
          options={[
            {
              label: "Female",
              value: "female",
            },
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Other",
              value: "other",
            },
          ]}
          value={selectedEditObj.gender}
          onSelect={(value) => {
            updateValue({ gender: value });
          }}
        />
        <p className={classes.error}>{errorObj.gender}</p>
      </div>
      <Button
        onClick={() => handleSignUp()}
        variant="contained"
        style={{
          width: "100%",
          backgroundColor: "#1acaca",
          marginTop: 10,
          marginBottom: 10,
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        SIGN UP
      </Button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span>
          Already a user?<Button onClick={() => handleLogin()}>LOGIN</Button>
        </span>
      </div>
    </div>
  );
}
