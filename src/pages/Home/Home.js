import React, { Component } from "react";
import LoginForm from "./LoginForm";
import "./Home.css";
import axios from 'axios';


class Home extends Component {

    state = {
        users: [],
        username: "",
        password: "",
    };

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        fetch('http://localhost:4000/api/users')
        .then(response => response.json())
        .then(response => this.setState({ users: response.data }))
        .catch(err => console.log('there is an error with getUsers: ', err))
    }

    // Keep track of what user enters for username so that input can be grabbed later
    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
        // console.log('username: ', this.state.username);
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
        // console.log('password: ', this.state.password);
    }

    handleUserSubmit = (event) => {
        event.preventDefault();
        console.log('username: ', this.state.username);
        console.log('password: ', this.state.password);
        const { setUser } = this.props;
        setUser("i am the user")
        axios.post('/Auth/login', { username: this.state.username, password: this.state.password})
            .then((res) => {
                console.log(res.data);
                setUser(res.data.userId)
                // history.push('/home')
            })
            .catch(err => console.log('this is a login error: ', err))     
    }
    
    render() {
        const { setUser } = this.props;

        return (
            <div className="Home">
                <div>
                    <h1 className="Home-title">RS/Timesheet</h1>
                    {/* <ul>
                        Grabbing the user as a test, as wasn't getting the information before. Then showing it to make sure it is working and it is.
                        {this.state.users.map(user => 
                        <li key={user.id}>
                            <p>{user.username}</p>
                            <p>{user.password}</p>
                        </li>)}
                    </ul> */}
                </div>
                <div>
                    <LoginForm
                    // users={this.state.users}
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