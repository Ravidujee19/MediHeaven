import React from 'react';
import { Accordion } from 'react-bootstrap';
import Footer from './Footer';

const faqData = [
  {
    question: "What is MediHeaven?",
    answer: "MediHeaven is a comprehensive health platform offering doctor channeling, health monitoring, AI-based suggestions, and more.",
  },
  {
    question: "How do I upload a prescription?",
    answer: "You can upload prescriptions via the 'My Prescriptions' tab after logging into your account.",
  },
  {
    question: "Who can add suppliers or health providers?",
    answer: "Only the admin has the privilege to add suppliers or health providers.",
  },
  
];

const FAQ = () => {
  return (
    <>
    <div className="container my-5">
      <h2 className="text-center mb-4">Frequently Asked Questions</h2>
      <Accordion defaultActiveKey="0">
        {faqData.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{item.question}</Accordion.Header>
            <Accordion.Body>{item.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
    <Footer/>
    </>
  );
};

export default FAQ;
