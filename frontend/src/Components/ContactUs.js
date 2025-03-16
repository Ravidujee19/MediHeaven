import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Nav from './Nav'

function ContactUs() {

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs
        .sendForm('service_2dwzp52', 'template_hp1xc1q', form.current, {
          publicKey: 'KsXwAjRD0p1XHVc5y',
        })
        .then(
          () => {
            console.log('SUCCESS!')
            alert("Success");
          },
          (error) => {
            console.log('FAILED...', error.text)
            alert("Not Send!");
          },
        );
    };

  return (
    <div>
      <Nav/>
      <h1>Contact Us</h1>
      <form ref={form} onSubmit={sendEmail}>
      <label>Name</label><br></br>
      <input type="text" name="user_name" /><br></br><br></br>
      <label>Email</label><br></br>
      <input type="email" name="user_email" /><br></br><br></br>
      <label>Message</label><br></br>
      <textarea name="message" /><br></br><br></br>
      <input type="submit" value="Send" /><br></br>
    </form>
    </div>
  )
}

export default ContactUs
