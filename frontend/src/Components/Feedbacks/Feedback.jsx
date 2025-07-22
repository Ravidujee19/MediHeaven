// import React, { useState } from "react";
// import axios from "axios";
// import "./feed.css";
// import Footer from "../../Components/Footer";

// const Feedback = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [contact, setContact] = useState("");
//   const [response, setResponse] = useState("");
//   const [comments, setComments] = useState("");
//   const [rating, setRating] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/feedback", {
//         name,
//         email,
//         contact,
//         response,
//         comments,
//         rating,
//       });

//       if (res.data.status === "success") {
//         setSuccessMessage("Feedback submitted successfully!");
//       } else {
//         setSuccessMessage("Failed to submit feedback.");
//       }
//     } catch (error) {
//       console.error("❌ Error submitting feedback:", error.response?.data || error);
//       setSuccessMessage("Server error. Try again later.");
//     }
//   };

//   return (
//     <>
//     <div className="feedback-container">
//       <div className="feedback-card">
//         <h2 className="feedback-title">Submit Your Feedback</h2>

//         {successMessage && <p className="success-message">{successMessage}</p>}

//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label>Name</label>
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//           </div>

//           <div className="input-group">
//             <label>Email</label>
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </div>

//           <div className="input-group">
//             <label>Contact Number</label>
//             <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} required />
//           </div>

//           <div className="input-group">
//             <label>Was your experience good?</label>
//             <select value={response} onChange={(e) => setResponse(e.target.value)} required>
//               <option value="" disabled>Select</option>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </select>
//           </div>

//           <div className="input-group">
//             <label>Comments</label>
//             <textarea value={comments} onChange={(e) => setComments(e.target.value)} rows="3"></textarea>
//           </div>

//           <div className="input-group">
//             <label>Rating</label>
//             <select value={rating} onChange={(e) => setRating(e.target.value)} required>
//               <option value="" disabled>Select Rating</option>
//               <option value="5">★★★★★</option>
//               <option value="4">★★★★☆</option>
//               <option value="3">★★★☆☆</option>
//               <option value="2">★★☆☆☆</option>
//               <option value="1">★☆☆☆☆</option>
//             </select>
//           </div>

//           <div className="btn-group">
//             <button className="btn-primary" type="submit">Submit Feedback</button>
//             <button className="btn-secondary" type="reset">Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default Feedback;

//Feedback.js


import React, { useState } from "react";
import axios from "axios";
import "./feed.css";
import Footer from '../Footer';

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [response, setResponse] = useState("");
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/feedback", {
        name,
        email,
        contact,
        response,
        comments,
        rating,
      });

      if (res.data.status === "success") {
        setSuccessMessage("✅ Feedback submitted successfully!");
      } else {
        setSuccessMessage("❌ Failed to submit feedback.");
      }
    } catch (error) {
      console.error("❌ Error submitting feedback:", error.response?.data || error);
      setSuccessMessage("⚠️ Server error. Try again later.");
    }
  };

  return (
    <>
    <div className="feedback-container">
      <div className="feedback-card">
        <h2 className="feedback-title">Submit Your Feedback</h2>

        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Contact Number</label>
            <input
  type="text"
  value={contact}
  maxLength={10}
  inputMode="numeric"
  placeholder="Enter 10-digit contact number"
  onChange={(e) => {
    const raw = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (raw.length === 0 || raw.startsWith("0")) {
      setContact(raw);
    }
  }}
  required
/>


          </div>

          <div className="input-group">
            <label>How was your experience?</label>
            <select
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              required
            >
              <option value="" disabled>
                -- Select Experience --
              </option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Poor">Poor</option>
              <option value="Very Poor">Very Poor</option>
            </select>
          </div>

          <div className="input-group">
            <label>Comments</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows="3"
            ></textarea>
          </div>

          <div className="input-group">
            <label>Rating (1-5)</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            >
              <option value="">-- Select Rating --</option>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Very Poor</option>
            </select>
          </div>

          <div className="btn-group">
            <button className="btn-primary" type="submit">
              Submit Feedback
            </button>
            <button
              className="btn-secondary"
              type="reset"
              onClick={() => {
                setName("");
                setEmail("");
                setContact("");
                setResponse("");
                setComments("");
                setRating("");
                setSuccessMessage("");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Feedback;



