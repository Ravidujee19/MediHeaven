import React from 'react';
import './App.css';
import Home from './Components/Home';
import AddUser from './Components/AddUser';
import Users from './Components/Users'
import { Route, Routes } from 'react-router-dom';
import UpdateUser from './Components/UpdateUser';

function App() {
  
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/mainhome" element={<Home/>} />
          <Route path="/adduser" element={<AddUser/>} />
          <Route path="/userdetails" element={<Users/>} />
          <Route path="/userdetails/:id" element={<UpdateUser/>} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
