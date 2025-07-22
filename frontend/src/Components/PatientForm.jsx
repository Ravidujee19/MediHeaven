import { useState } from "react";
import axios from "axios";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Footer from "./Footer";

const PatientForm = () => {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    sleepHours: "",
    exerciseHours: "",
    target: "",
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    const textFields = ["name", "target"];
    const numberFieldConfig = {
      age: { min: 1, max: 100, maxLength: 3 },
      height: { min: 1, max: 272, maxLength: 3 },
      weight: { min: 1, max: 300, maxLength: 3 },
      sleepHours: { min: 0, max: 24, maxLength: 2 },
      exerciseHours: { min: 0, max: 18, maxLength: 2 },
    };
  
    if (textFields.includes(name)) {
      if (
        value.length <= 50 &&
        (/^[A-Za-z][A-Za-z0-9 ]*$/.test(value) || value === "")
      ) {
        setPatient((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }
  
    if (Object.keys(numberFieldConfig).includes(name)) {
      const config = numberFieldConfig[name];
  
      if (!/^\d*$/.test(value)) return; // allow only digits
      if (value === "") {
        setPatient((prev) => ({ ...prev, [name]: value }));
        return;
      }
  
      const num = parseInt(value, 10);
      if (
        value.length <= config.maxLength &&
        num >= config.min &&
        num <= config.max
      ) {
        setPatient((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }
  
    if (name === "gender") {
      setPatient((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handlePaste = (e, fieldName) => {
    const pasted = e.clipboardData.getData("Text");
    const numberFieldConfig = {
      age: { min: 1, max: 100 },
      height: { min: 40, max: 272 },
      weight: { min: 30, max: 300 },
      sleepHours: { min: 0, max: 24 },
      exerciseHours: { min: 0, max: 18 },
    };
  
    if (!/^\d+$/.test(pasted)) {
      e.preventDefault(); // block non-numeric
      return;
    }
  
    const num = parseInt(pasted, 10);
    const config = numberFieldConfig[fieldName];
  
    if (!config || num < config.min || num > config.max) {
      e.preventDefault(); // block out-of-range
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/patients", patient);

      Swal.fire({
        icon: "success",
        title: "Submission Successful!",
        html: `<strong>BMI:</strong> ${res.data.bmi}<br>${res.data.suggestions}`,
      });

      // Reset form
      setPatient({
        name: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        sleepHours: "",
        exerciseHours: "",
        target: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed!",
        text: "An error occurred while submitting the form. Please try again.",
      });
      console.error("Error:", error);
    }
  };

  return (
    // <>
    //   <div className="container mt-5">
        
    //       <Card.Body>
    //         <h3 className="text-center text-primary mb-4">Enter Health Details</h3>
    //         <Form onSubmit={handleSubmit}>
    //           <Row className="g-3">
    //             {[
    //               { name: "name", label: "Note" },
    //               { name: "age", label: "Age" },
    //               { name: "height", label: "Height (cm)" },
    //               { name: "weight", label: "Weight (kg)" },
    //               { name: "sleepHours", label: "Sleep Hours" },
    //               { name: "exerciseHours", label: "Exercise Hours" },
    //               { name: "target", label: "Target" },
    //             ].map((field, index) => (
    //               <Col md={6} key={index}>
    //                 <Form.Group>
    //                   <Form.Label className="fw-bold">{field.label}</Form.Label>
    //                   <Form.Control
    //                     type="text"
    //                     name={field.name}
    //                     placeholder={`Enter ${field.label}`}
    //                     value={patient[field.name]}
    //                     onChange={handleInputChange}
    //                     required
    //                   />
    //                 </Form.Group>
    //               </Col>
    //             ))}

    //             {/* Gender Radio Buttons */}
    //             <Col md={6}>
    //               <Form.Group>
    //                 <Form.Label className="fw-bold">Gender</Form.Label>
    //                 <div>
    //                   {["Male", "Female", "Others"].map((gender) => (
    //                     <Form.Check
    //                       key={gender}
    //                       inline
    //                       label={gender}
    //                       type="radio"
    //                       name="gender"
    //                       value={gender}
    //                       checked={patient.gender === gender}
    //                       onChange={handleInputChange}
    //                       required
    //                     />
    //                   ))}
    //                 </div>
    //               </Form.Group>
    //             </Col>
    //           </Row>

    //           <div className="text-center mt-4">
    //             <Button type="submit" variant="success" size="lg">
    //               Submit
    //             </Button>
    //           </div>
    //         </Form>
    //       </Card.Body>
        
    //   </div>
    //   <br />
    //   <Footer />
    // </>
    <>
  <div className="container mt-5">
    <Card.Body>
      <h3 className="text-center text-success mb-4">Enter Health Details</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          {[
            { name: "name", label: "Note" },
            { name: "age", label: "Age" },
            { name: "height", label: "Height (cm)" },
            { name: "weight", label: "Weight (kg)" },
            { name: "sleepHours", label: "Sleep Hours" },
            { name: "exerciseHours", label: "Exercise Hours" },
            { name: "target", label: "Target" },
          ].map((field, index) => (
            <Col md={6} key={index}>
              <Form.Group>
                <Form.Label className="fw-bold">{field.label}</Form.Label>
                <Form.Control
                  type="text"
                  name={field.name}
                  placeholder={`Enter ${field.label}`}
                  value={patient[field.name]}
                  onChange={handleInputChange}
                  onPaste={
                    ["age", "height", "weight", "sleepHours", "exerciseHours"].includes(field.name)
                      ? (e) => handlePaste(e, field.name)
                      : undefined
                  }
                  required
                />
              </Form.Group>
            </Col>
          ))}

          {/* Gender Radio Buttons */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Gender</Form.Label>
              <div>
                {["Male", "Female", "Others"].map((gender) => (
                  <Form.Check
                    key={gender}
                    inline
                    label={gender}
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={patient.gender === gender}
                    onChange={handleInputChange}
                    required
                  />
                ))}
              </div>
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button type="submit" variant="success" size="lg">
            Submit
          </Button>
        </div>
      </Form>
    </Card.Body>
  </div>
  <br />
  <Footer />
</>

  );
};

export default PatientForm;
