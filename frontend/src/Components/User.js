import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router';

function User(props) {

  const {_id, name, gmail, age, address, gender} = props.user;

  const history = useNavigate();

  //Delete function
  const deleteHandler = async()=> {
    await axios.delete(`http://localhost:5000/users/${_id}`)
    .then(res=>res.data)
    .then(() =>history("/"))
    .then(() =>history("/userdetails"))
  }

  return (
    <div>
      <h1>ID:{_id}</h1>
      <h1>Name:{name}</h1>
      <h1>Gmail:{gmail}</h1>
      <h1>Age:{age}</h1>
      <h1>Address:{address}</h1>
      <h1>Gender:{gender}</h1>
      <Link to={`/userdetails/${_id}`}>Update</Link>
      <button onClick={deleteHandler}>Delete</button>
      <br></br><br></br><br></br>
    </div>
  )
}

export default User
