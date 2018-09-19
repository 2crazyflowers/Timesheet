//import React, { Component } from 'react';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Timesheet from "./pages/Timesheet";

// import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/timesheet" component={Timesheet} />
      </Switch>
    </div>
  </Router>
);

export default App;
