import React from "react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import { Title } from "./common/Title";
import { expertise } from "@/assets/data/dummydata";
import { Card } from "./common/CaseCard";

const Expertise = () => {
  return (
    <section className="expertise">
      <div className="container">
        {/* ✅ Heading Animation */}
        <motion.div
          className="heading-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title title="Our Expertise" />
          <p>
            We specialize in cutting-edge solutions, leveraging technology and innovation 
            to drive success. From strategy to execution, we ensure impactful results.
          </p>
        </motion.div>

        {/* ✅ Card Grid with Animation */}
        <motion.div
          className="hero-content grid-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, staggerChildren: 0.2 }}
        >
          {expertise.map((item) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: item.id * 0.1 }}
            >
              <Card data={item} caption="Learn More" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Expertise;
