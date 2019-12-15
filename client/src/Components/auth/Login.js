import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import classes from "./Login.module.css";

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      token: null,
      error: false,
      errors: {
        email: "",
        password: ""
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password
    };
    
    axios.post("/api/users/login", newUser)
      .then(res => {
        let token = res.data.token
        console.log(token);
        this.setState({ token: token, error: false, errors: {} })
      })
      .catch(err => {
        this.setState({ error: true, errors: err})
      });
    
  }

  render() {
    let redirect = this.state.token != null ? <Redirect to={{
      pathname: '/profile',
      email: this.state.email,
      auth: this.state.token
    }}
    /> : null

    return (
      < div >
        <div className="register">
          <div className={[classes.Login, "container"].join(' ')}>
            <div className="row">
              <div className="col-md-8 m-auto">

                {redirect}
                <h1 className="display-4 text-center">Sign In</h1>
                <p className="lead text-center">
                  Login with your DevConnector account
                </p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  {this.state.error ? <div>{this.state.errors.email}{this.state.errors.password}</div> : null}
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
export default Login;
