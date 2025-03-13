import React from "react";
import { Link } from "react-router-dom";


function Nav() {
  return (
    <div>
      <ul>
        <li className="home-ul">
          <Link to="/" className="active home-a">
            <h1>Home</h1>
          </Link>
        </li>
        <li className="home-ul">
          <Link to="/adduser" className="active home-a">
            <h1>Add user</h1>
          </Link>
        </li>
        <li className="home-ul">
          <Link to="/userdetails" className="active home-a">
            <h1>user details</h1>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
