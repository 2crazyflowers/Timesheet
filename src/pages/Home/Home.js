import React, { Component } from "react";
import LoginForm from "./LoginForm";
import "./Home.css";

class Home extends Component {

    state = {
        users: [],
        username: "",
        password: "",
        // credentials: [],
        // error: "",
    };


    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        fetch('http://localhost:4000/users')
        .then(response => response.json())
        .then(({ data }) => {
            console.log('the users/data info from home.js: ', data)
        })
        .then(response => this.setState({ users: response.data }))
        .then(console.log('these are the current users: ', this.state.users))
        .catch(err => console.log('there is an error with getUsers: ', err))
    }

    // Keep track of what user enters for username so that input can be grabbed later
    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
        console.log('username: ', this.state.username);
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
        console.log('password: ', this.state.password);
    }

    handleUserSubmit = (event) => {
        event.preventDefault();
        console.log('Adding user info');
        console.log('this.state.username: ', this.state.username);
        console.log('this.state.password: ', this.state.password);
    }

    render() {
        return (
            <div className="Home">
                <div>
                    <h1 className="Home-title">RS/Timesheet</h1>
                </div>
                <div>
                    <LoginForm
                    users={this.state.users}
                    handleUserSubmit = {this.handleUserSubmit}
                    handleUsernameChange = {this.handleUsernameChange}
                    handlePasswordChange = {this.handlePasswordChange}
                    />
                </div>
            </div>
        );
    }
}

export default Home;