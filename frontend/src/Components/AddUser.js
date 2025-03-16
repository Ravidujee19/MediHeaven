import React, {useState} from 'react'
import Nav from './Nav'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function AddUser() {

  const history = useNavigate();
  const [inputs, setInputs] = useState({

    name: "",
    gmail: "",
    age: "",
    address: "",
    gender: ""

  });

  const handleChange = (e) => {
    setInputs((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>history('../userdetails'))
  }

  const sendRequest = async()=> {
    await axios.post("http://localhost:5000/users", {
      name: String (inputs.name),
      gmail: String (inputs.gmail),
      age: Number (inputs.age),
      address: String (inputs.address),
      gender: String (inputs.gender)
    }).then(res => res.data);
  }

  return (
    <div>
      <Nav/>
      <h1>Add Users</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={inputs.name} onChange={handleChange} className="w-full p-2 border rounded-md" /><br></br><br></br>
        <input type="email" name="gmail" placeholder="Gmail" value={inputs.gmail} onChange={handleChange} className="w-full p-2 border rounded-md" /><br></br><br></br>
        <input type="number" name="age" placeholder="Age" value={inputs.age} onChange={handleChange} className="w-full p-2 border rounded-md" min="1" max="100" /><br></br><br></br>
        <input type="text" name="address" placeholder="Address" value={inputs.address} onChange={handleChange} className="w-full p-2 border rounded-md" /><br></br><br></br>
        <select name="gender" value={inputs.gender} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select><br></br><br></br>
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700">Submit</button>
      </form>
    </div>
  )
}

export default AddUser
