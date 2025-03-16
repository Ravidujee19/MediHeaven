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
            <h1>User details</h1>
          </Link>
        </li>
        <li className="home-ul">
          <Link to="/sendpdf" className="active home-a">
            <h1>Send Pdf</h1>
          </Link>
        </li>
        <li className="home-ul">
          <Link to="/imgpart" className="active home-a">
            <h1>Photos</h1>
          </Link>
        </li>
        <li className="home-ul">
          <Link to="/contactus" className="active home-a">
            <h1>Contact us</h1>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
