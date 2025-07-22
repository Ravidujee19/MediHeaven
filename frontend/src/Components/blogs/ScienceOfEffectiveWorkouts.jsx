import React from "react";
import { motion } from "framer-motion";
import Footer from "../../Components/Footer";

const ScienceOfEffectiveWorkouts = () => {
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
          The Science of Effective Workouts
        </motion.h1>

        <motion.img
          src="/Images/homeblog2.jpg"
          alt="Workouts"
          className="w-100 mb-4"
          style={{ borderRadius: "12px", maxHeight: "450px", objectFit: "cover" }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Exercising smartly isn't about pushing harder every time — it's about understanding how your body responds
          to stress, recovery, and adaptation. With the right balance of movement, rest, and nutrition, you can
          unlock your body's full potential.
        </motion.p>

        <Section title="Progressive Overload">
          This foundational principle of strength training refers to gradually increasing resistance or intensity
          to challenge your muscles over time. As your body adapts, you must progressively lift heavier or perform
          more reps to stimulate further muscle development and endurance gains.
        </Section>

        <Section title="Muscle Hypertrophy">
          Hypertrophy is the process of muscle growth through the breakdown and repair of muscle fibers.
          It occurs when you train with adequate intensity and volume — typically using moderate weights
          with controlled movements and proper rest intervals between sets.
        </Section>

        <Section title="Rest and Recovery">
          True progress happens during rest, not during the workout itself. Recovery allows the body to repair
          microtears in muscles and replenish energy stores. Skipping rest days or getting insufficient sleep
          can lead to burnout, plateauing, and increased injury risk.
        </Section>

        <Section title="Importance of Nutrition">
          Your muscles need fuel to perform and recover. Protein helps rebuild tissue, carbohydrates provide energy,
          and healthy fats support hormonal balance. A well-balanced diet tailored to your workout intensity is
          essential for optimizing results.
        </Section>

        <Section title="The Consistency Factor">
          The most powerful workout strategy is consistency. Rather than chasing extreme, short-term gains,
          building a sustainable and enjoyable fitness routine leads to lasting change. Progress takes time,
          and sticking with it is half the battle won.
        </Section>

        <Section title="Final Thoughts">
          Understanding the science behind your workouts empowers you to train more effectively and safely.
          Whether you’re a beginner or a seasoned athlete, principles like progressive overload, proper rest,
          and smart nutrition are essential for success. Stay committed, be patient, and let your body evolve.
        </Section>
      </motion.div>

      <Footer />
    </>
  );
};

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

export default ScienceOfEffectiveWorkouts;
