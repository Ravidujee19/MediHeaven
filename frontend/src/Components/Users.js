import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import axios from 'axios';
import User from './User';
// import {useReactToPrint} from 'react-to-print';

const URL ="http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function Users() {

  const [users, setUsers] = useState(); 
  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  });

  //Pdf
  // const ComponentsRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => ComponentsRef.current,
  //   DocumentTitle:"User Report",
  //   onAfterprint:()=>alert("Report Successfully Download !"),
  // })

  //Search
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.users.filter((user) =>
      Object.values(user).some((field) =>
      field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      ))
      setUsers(filteredUsers);
      setNoResults(filteredUsers.lenght === 0);
    })
  }

  //Whatapp
  const handleSendReport = () => {
    //Url
    const phoneNumber = "+94772658071";
    const message = `selected user report`
    const WhatAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=
    ${encodeURIComponent(message)}`;

    //open wapp chat in a new window
    window.open(WhatAppUrl, "_blank");
  };

  return (
    <div>
      <Nav/>
      <h1>User Details Display Page</h1>

      {/* Search */}
      <input onChange={(e)=> setSearchQuery(e.target.value)}
      type="text"
      name="search"
      placeholder="Search here"
      ></input>   

      <button onClick={handleSearch}>Search</button>

      {noResults ? (
        <div>
          <p>No Users Found</p>
        </div>
      ):(
        // <div ref={ComponentsRef}>
        <div>
      {users && users.map((user , i ) => (
        <div key={i}>
          <User user={user}/>
        </div>
        ))}
      </div>
      )}

      {/* <button onClick={handlePrint}>Download Report</button> */}
      <button onClick={handleSendReport}>Send Whatapp Message</button>
    </div>

  )
}

export default Users
