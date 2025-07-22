import React from "react";
import { motion } from "framer-motion";
import Footer from "../../Components/Footer";

const Top10Superfoods = () => {
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
          Top 10 Superfoods
        </motion.h1>

        <motion.img
          src="/Images/homeblog1.jpg"
          alt="Superfoods"
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
          Superfoods are nature’s power-packed gifts, rich in essential nutrients that support overall health and vitality.
          From reducing inflammation and improving heart health to enhancing digestion and boosting immunity, these ten
          superfoods offer a wide array of benefits that can easily be integrated into your daily diet.
        </motion.p>

        <Section title="Blueberries">
          Often referred to as nature’s candy, blueberries are one of the most antioxidant-rich fruits available. They
          contain anthocyanins, which help combat oxidative stress and inflammation in the body. Regular consumption
          of blueberries may improve memory, lower blood pressure, and support heart and brain health.
        </Section>

        <Section title="Kale">
          Kale has earned its reputation as a super green thanks to its impressive nutritional profile. Packed with
          vitamins A, C, and K, as well as iron and fiber, kale supports immune function, blood clotting, and digestion.
          It’s also a detoxifying food that helps cleanse the liver naturally.
        </Section>

        <Section title="Salmon">
          Salmon is a powerhouse of omega-3 fatty acids, which are essential for brain function, cardiovascular health,
          and reducing chronic inflammation. It’s also an excellent source of protein and B vitamins, making it a
          go-to for muscle repair and energy production.
        </Section>

        <Section title="Quinoa">
          Unlike most plant foods, quinoa is a complete protein, meaning it contains all nine essential amino acids.
          It’s also rich in magnesium, iron, and fiber. Quinoa provides sustained energy and is a versatile grain that
          fits well into a variety of meals.
        </Section>

        <Section title="Nuts">
          Almonds, walnuts, and other tree nuts are rich in heart-healthy fats, vitamin E, and plant-based protein.
          Eating nuts regularly can help lower LDL cholesterol, reduce inflammation, and promote healthy weight management
          due to their satiating nature.
        </Section>

        <Section title="Seeds">
          Tiny but mighty, seeds like chia, flax, and pumpkin are excellent sources of fiber, protein, and omega-3s.
          They contribute to digestive health, hormonal balance, and improved heart function. Chia seeds also absorb
          water and expand in the stomach, helping you feel fuller for longer.
        </Section>

        <Section title="Avocados">
          Avocados are rich in monounsaturated fats, potassium, and fiber, which support cardiovascular health and help
          regulate blood pressure. Their creamy texture and mild flavor make them easy to incorporate into meals, whether
          on toast, in smoothies, or as guacamole.
        </Section>

        <Section title="Sweet Potatoes">
          Sweet potatoes are a complex carbohydrate packed with beta-carotene, vitamin C, and fiber. They help support
          eye health, enhance skin glow, and stabilize blood sugar levels. Their natural sweetness makes them a nutritious
          comfort food.
        </Section>

        <Section title="Greek Yogurt">
          Greek yogurt contains twice the protein of regular yogurt, along with probiotics that support gut health.
          It's a great post-workout snack for muscle recovery and helps strengthen your immune system through its
          beneficial bacterial cultures.
        </Section>

        <Section title="Green Tea">
          This ancient beverage is celebrated for its metabolism-boosting and fat-burning properties. Green tea is loaded
          with antioxidants like catechins that protect cells and improve brain function. A daily cup may reduce the risk
          of heart disease and promote longevity.
        </Section>

        <Section title="Final Thoughts">
          Including these superfoods in your diet is a smart step toward long-term wellness. While no single food can
          guarantee perfect health, a diet rich in these nutrient-dense options can significantly reduce your risk of
          chronic illness and help you feel more energized, focused, and balanced every day.
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

export default Top10Superfoods;
