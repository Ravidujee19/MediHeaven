import React from 'react';
import './App.css';
import Home from './Components/Home';
import AddUser from './Components/AddUser';
import Users from './Components/Users'
import UpdateUser from './Components/UpdateUser';
import ContactUs from './Components/ContactUs';
import { Route, Routes } from 'react-router-dom';
import SendPdf from './Components/SendPdf';
import ImageUploder from './Components/Images';



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
          <Route path="/sendpdf" element={<SendPdf/>} />
          <Route path="/imgpart" element={<ImageUploder/>} />
          <Route path="/contactus" element={<ContactUs/>} />

        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
