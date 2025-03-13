import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router'
import {useNavigate} from 'react-router'

function UpdateUser() {

    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;

    useEffect(()=> {
        const fetchHandler =async () => {
            await axios
            .get(`http://localhost:5000/users/${id}`)
            .then((res)=> res.data)
            .then((data) => setInputs(data.user));
        };
        fetchHandler();
    },[id]);

    const sendRequest = async ()=> {
        await axios
        .put(`http://localhost:5000/users/${id}`, {
            name: String (inputs.name),
            gmail: String (inputs.gmail),
            age: Number (inputs.age),
            address: String (inputs.address),
            gender: String (inputs.gender)
        })
        .then((res) => res.data);
    }

    const handleChange = (e) => {
        setInputs((prevState)=> ({
          ...prevState,
          [e.target.name]: e.target.value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>history('../userdetails'));
      }

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={inputs.name} onChange={handleChange} className="w-full p-2 border rounded-md" />
        <input type="email" name="gmail" placeholder="Gmail" value={inputs.gmail} onChange={handleChange} className="w-full p-2 border rounded-md" />
        <input type="number" name="age" placeholder="Age" value={inputs.age} onChange={handleChange} className="w-full p-2 border rounded-md" min="1" max="100" />
        <input type="text" name="address" placeholder="Address" value={inputs.address} onChange={handleChange} className="w-full p-2 border rounded-md" />
        <select name="gender" value={inputs.gender} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700">Submit</button>
      </form>
    </div>
  )
}

export default UpdateUser
