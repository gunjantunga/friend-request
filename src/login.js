import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./endpoint";
const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: 400,
    minHeight: 400,
    backgroundColor: "beige",
    borderRadius: 8,
    padding: 15,
  },
  error:{
    color:'red',
    marginTop:'3px',
    marginBottom:'3px'
  }
}));

export default function LoginPage() {
  const classes = useStyles();

  const [errorObj, setErrorObj] = useState({});
  const [selectedEditObj,setSelectedEditObj] = useState({});

  const handleLogin = () => {
    if(!validateForm()) return;
    let data={
      email:selectedEditObj.email,
      password:selectedEditObj.password,
      'strategy':'local'
    };
    loginUser(data).then((response)=>{
      if(response.accessToken){

        localStorage.setItem('accessToken',response.accessToken);
        localStorage.setItem('user',JSON.stringify(response.user));
        navigateToProfile();
      }
    })
  };
  const navigate = useNavigate();

  const navigateToProfile = () => {
    // 👇️ navigate to /contacts
    navigate("/profile");
  };

  const handleSignUp = () => {
    navigateToSignUp();
  };
  const navigateToSignUp = () => {
    // 👇️ navigate to /contacts
    navigate("/signup");
  };
  const updateValue = (obj) => {
    setSelectedEditObj({...selectedEditObj,...obj});
  };
  const validateForm = () => {
    let errorList = {};

   
    if (!selectedEditObj.email) {
      errorList.email = "Please provide your email .";
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
  };

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
        Log-in
      </p>
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="Email"
        style={{ width: "100%", paddingTop: 10, paddingBottom: 10 }}
        value={selectedEditObj.email}
        onChange={(e)=>{
          updateValue({email:e.target.value})
        }}
      />
      <p className={classes.error}>{errorObj.email}</p>
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="Password"
        style={{ width: "100%", paddingTop: 10, paddingBottom: 10 }}
        value={selectedEditObj.password}
        onChange={(e)=>{
          updateValue({password:e.target.value})
        }}
      />
      <p className={classes.error}>{errorObj.password}</p>
      <Button
        onClick={() => handleLogin()}
        variant="contained"
        style={{
          width: "100%",
          backgroundColor: "#1acaca",
          marginTop: 20,
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        LOGIN
      </Button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <span>
          Not a user?<Button onClick={() => handleSignUp()}>Sign up</Button>
        </span>
      </div>
    </div>
  );
}
