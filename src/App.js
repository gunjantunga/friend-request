import "./App.css";
import { Header } from "./components/header";
import Profile from "./components/profile";
import { makeStyles } from "@material-ui/core/styles";
import SignUp from "./signup";
import LoginPage from "./login";
import { Switch, Route, Routes } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  profileContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Header>Friend Request App</Header>
      <div className={classes.profileContainer}>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;

function X() {
  return <>x</>;
}
