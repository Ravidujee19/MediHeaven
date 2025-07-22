import React from "react";
import { motion } from "framer-motion";
import Footer from "../../Components/Footer";

const HydrationMyths = () => {
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
          Hydration Myths
        </motion.h1>

        <motion.img
          src="/Images/homeblog3.jpg"
          alt="Hydration"
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
          Hydration is essential for life, yet it's surrounded by many misconceptions.
          While it's important to drink enough water, there's no universal rule that applies to everyone.
          Factors like age, activity level, climate, and diet all influence how much water your body needs.
        </motion.p>

        <Section title="The 8 Glasses Myth">
          The idea that everyone must drink eight glasses of water per day is one of the most widespread hydration myths.
          In truth, our bodies are highly capable of regulating fluid balance, and thirst is a reliable indicator.
          Rigidly following the eight-glass rule can lead to unnecessary overhydration for some.
        </Section>

        <Section title="Does Caffeine Dehydrate You?">
          It's commonly believed that caffeinated beverages like coffee and tea dehydrate you, but this is misleading.
          While caffeine is a mild diuretic, moderate consumption still contributes positively to your daily fluid intake.
          There's no need to avoid coffee or tea for fear of dehydration.
        </Section>

        <Section title="Clear Urine Isn't Always Ideal">
          Many assume that clear urine is the gold standard of hydration, but excessively clear urine may indicate
          overhydration, which can dilute essential electrolytes. A light yellow color is usually a better sign
          of healthy hydration.
        </Section>

        <Section title="Overhydration Can Be Harmful">
          Drinking too much water too quickly, especially without replenishing electrolytes, can lead to hyponatremia—
          a potentially dangerous condition where sodium levels in the blood become too low. It’s vital to strike a balance
          based on your body’s needs.
        </Section>

        <Section title="Trust Your Body">
          Rather than sticking to a fixed water quota, it's better to respond to thirst, monitor urine color,
          and adjust your intake based on physical activity and weather. Let your body be your guide instead of strict hydration fads.
        </Section>

        <Section title="Final Thoughts">
          Hydration is key to well-being, but myths often lead people to overcompensate or misinterpret their needs.
          By understanding the real science behind hydration, you can stay healthy and hydrated without falling for misinformation.
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

export default HydrationMyths;
