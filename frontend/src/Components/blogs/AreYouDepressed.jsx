import React from "react";
import { motion } from "framer-motion";
import Footer from "../../Components/Footer"

const AreYouDepressed = () => {
  return (
    <>
      <motion.div
        className="container py-5"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="mb-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Are You Depressed?
        </motion.h1>

        <motion.img
          src="/Images/homeblog4.jpg"
          alt="Person feeling depressed"
          className="w-100 mb-4"
          style={{ borderRadius: "12px", maxHeight: "500px", objectFit: "cover" }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Depression is more than just a fleeting feeling of sadness or a rough day.
          It's a serious mental health condition that affects how a person thinks, feels,
          and handles daily activities. Recognizing the signs early can be the first step toward healing.
        </motion.p>

        <Section title="What is Depression?">
          Depression is a common but serious mood disorder. It causes severe symptoms
          that affect how you feel, think, and handle daily activities such as sleeping,
          eating, or working. Unlike temporary emotional responses to challenges in everyday life,
          depression can persist for weeks, months, or even years.
        </Section>

        <Section title="Common Symptoms">
          <ul>
            <li>Persistent sad, anxious, or "empty" mood</li>
            <li>Loss of interest or pleasure in hobbies and activities</li>
            <li>Fatigue or decreased energy</li>
            <li>Changes in appetite or weight</li>
            <li>Insomnia or excessive sleeping</li>
            <li>Feelings of hopelessness or pessimism</li>
            <li>Difficulty concentrating or making decisions</li>
            <li>Thoughts of death or suicide</li>
          </ul>
        </Section>

        <Section title="When to Seek Help">
          If you or someone you know is experiencing symptoms of depression for more than two weeks,
          it's important to reach out to a mental health professional. Early intervention can prevent symptoms from worsening
          and support recovery.
        </Section>

        <Section title="Ways to Cope">
          <ul>
            <li>Talk to someone you trust</li>
            <li>Practice regular physical activity</li>
            <li>Eat a balanced and healthy diet</li>
            <li>Follow a consistent sleep schedule</li>
            <li>Limit alcohol and avoid drugs</li>
            <li>Seek professional counseling or therapy</li>
          </ul>
        </Section>

        <Section title="Final Thoughts">
          You are not alone. Millions of people deal with depression every year, and many recover
          with the right support and treatment. If you're feeling overwhelmed, take the first step
          by reaching out. Help is available, and things can get better.
        </Section>
      </motion.div>

      <Footer />
    </>
  );
};

// Reusable animated section component
const Section = ({ title, children }) => (
  <motion.div
    className="mt-4"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h3>{title}</h3>
    <div>{children}</div>
  </motion.div>
);

export default AreYouDepressed;
