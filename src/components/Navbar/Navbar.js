import React from "react";
import "./Navbar.css";


const Navbar = props => (
    <div className="Navbar">
        <button className="ChangeWeek">Change Week</button>
        <button className="Logout">Logout</button>
    </div>
);

export default Navbar;