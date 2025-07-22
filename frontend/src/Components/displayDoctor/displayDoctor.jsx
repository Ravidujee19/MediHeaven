import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './displayDoctor.css'
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function DisplayDoctor(props) {
  const { _id, name, email, Speciality, Description, Amount, Phone, customId } = props.doctor;

  const history = useNavigate();

  const deleteHandler = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This doctor will be deleted permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/doctors/${_id}`);
          Swal.fire('Deleted!', 'Doctor has been deleted.', 'success').then(() => {
            window.location.reload(); // refresh the screen
          });;
          history("/doctorsDetails");
        } catch (error) {
          Swal.fire('Error!', 'There was a problem deleting the doctor.', 'error');
        }
      }
    });
  };

  const updateHandler = () => {
    Swal.fire({
      title: 'Redirecting...',
      text: 'You are being redirected to the update page.',
      icon: 'info',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      history(`/doctorsDetails/${_id}`);
    });
  };

  

  return (
    <div className="container-for-admin-doctors bg-success">
      <h1 className="title-for-admin">Doctor Details</h1>
      <div className="details-for-admin ">

     <p><strong>Id:</strong> {customId}</p>


        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Speciality:</strong> {Speciality}</p>
        <p><strong>Description:</strong> {Description}</p>
        <p><strong>Amount:</strong> {Amount}</p>
        <p><strong>Phone:</strong> {Phone}</p>
      </div>
      <div className="buttonContainer-for-admin">
        <button className="button updateButton-for-admin bg-secondary" onClick={updateHandler}>Update</button>
        <button className="button deleteButton-for-admin" onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}

export default DisplayDoctor;
