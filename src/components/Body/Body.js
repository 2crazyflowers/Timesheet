import React from "react";
import "./Body.css";


const Body = props => (
    <form>
      <label>
        User
        <input type="text" name="user"/>
      </label>
      <br></br>
      <label className="Login">
        Pass
        <input type="text" name="pass"/>
      </label>
      <input type="submit" value="Submit"/>
    </form>
);

export default Body;