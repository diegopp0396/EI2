import React from "react";
import "./App.css";
import Navbar from "./Components/layout/NavBar";
import Footer from "./Components/layout/Footer";
import Landing from "./Components/layout/Landing";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
//Import routes REACT
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <div><Route exact path="/" component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
