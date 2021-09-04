import React, { useState, useEffect } from "react";
import "./pages.css";
import Dashboard from "./components/dashboard";
import Header from "./components/header";
import NavBar from "./components/navBar";
import Polls from "./components/polls";
import Teams from "./components/teams";
import CreatePoll from "./components/createPoll";
import AddMember from "./components/addMember";
import Login from "./components/login";
import Vote from "./components/vote";
import Results from "./components/results";
import AssignMembers from "./components/assignMembers";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  //localStorage.setItem("username", JSON.stringify(null))
  let username = JSON.parse(localStorage.getItem("username"));
  //let password = JSON.parse(localStorage.getItem("password"))
  const [Loggedin, setLoggedin] = useState(false);
  useEffect(() => {
    username === null ? setLoggedin(false) : setLoggedin(true);
  }, [username, Loggedin]);
  return JSON.parse(localStorage.getItem("username")) === null &&
    JSON.parse(localStorage.getItem("password")) === null ? (
    <Login />
  ) : (
    <div className="App">
      <Header />
      <Router>
        <NavBar />
        <Switch>
          <Route path="/polls" component={Polls} />
          <Route path="/teams" component={Teams} />
          <Route path="/create-poll" component={CreatePoll} />
          <Route path="/add-member" component={AddMember} />
          <Route path="/login" component={Login} />
          <Route path="/vote" component={Vote} />
          <Route path="/results" component={Results} />
          <Route path="/assign" component={AssignMembers} />
          <Route path={["/dashboard", ""]} component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
