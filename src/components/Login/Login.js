// Importing React since we are using React.
import React, { Component } from "react";
// Importing UI components and style from material-ui-next

// Import LoginForm
//import LoginForm from './LoginForm';
// import axios from 'axios';
//import {withRouter, Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: "",
    password: "",
    credentials: [],
    error: ""
  };


  // Keep track of what user enters for username so that input can be grabbed later
  handleUsername = (event) => {
    this.setState({username: event.target.value });
  }

  // Keep track of what user enters into password input field so that input can be grabbed later
  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  }


  // When user enters credentials and clicks login button to log in.
  handleSubmit = event => {
    //const { history, setUser } = this.props;
    event.preventDefault();
    console.log("Authenticating user...");
    console.log("this.state.username: ", this.state.username);
    console.log("this.state.password: ", this.state.password);
    // setUser("i am the user")
    // axios.post('/Auth/login', { username: this.state.username, password: this.state.password})
    //   .then((res) => {
    //     console.log(res.data);
    //     setUser(res.data.userId)
    //     history.push('/home')
        
    //   })
    //   .catch(err => console.log('this is a login error: ', err))
  };

  render() {
    // const { classes, history, setUser } = this.props;
    return [
      <div>
        <form>
          <label>
          User
          <input 
          type="text" 
          name="username"  
          className="Login"
          value={this.props.username}
          onChange={this.props.handleUsername}/>
          </label>
          <br></br>
          <label>
          Pass
          <input 
          type="text" 
          name="pass"  
          className="Login"
          onChange={this.props.handlePassword}
          />
          </label>
          <br></br>
          <input type="submit" value="Login" className="Button"
          value={this.props.password}
          onChange={this.props.handleSubmit}/>
        </form>
      </div>
    ];
  }
}

// Exporting the Login component
// so that the App.js file can render the Login page.
export default (Login);