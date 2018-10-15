import React, { Component } from 'react';
//import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Timesheet from "./pages/Timesheet";

// import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";

class App extends Component {

  state = {
    currentlyLoggedInUser: null
  }
  
  setUser = userId => {
    this.setState ({ currentlyLoggedInUser: userId})
    console.log('the userId is: ', userId)
  }

  render(){
    return [
      <Router>
        <div>
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            {/* <Route exact path="/timesheet" component={Timesheet} /> */}
            <Route exact path="/" render={props => <Home {...props} setUser={this.setUser}></Home>} />
            <Route exact path="/timesheet" render={props => <Timesheet 
              {...props}></Timesheet>} loggedInUser={this.state.currentlyLoggedInUser} />
          </Switch>
        </div>
      </Router>
    ];
  }
}

export default App;
