import React from "react";
import "./App.css";
import classes from "./App.module.css";
import Navbar from "./Components/layout/NavBar";
import Footer from "./Components/layout/Footer";
import Landing from "./Components/layout/Landing";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import Profile from "./Components/profile/Profile";
//Import routes REACT
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div >
        <Navbar></Navbar>
        <div>
          <Route exact path="/" component={Landing} />
          <div className={[classes.App, "App"].join(' ')}>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
