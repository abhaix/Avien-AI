import { showcase } from "@/assets/data/dummydata";
import { Card } from "@/components/common/CaseCard";
import { Title, TitleSm } from "@/components/common/Title";
import React from "react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

const ShowCase = () => {
  return (
    <motion.section
      className="showcase bg-top"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container">
        {/* ✅ Animated Heading */}
        <motion.div
          className="heading-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <TitleSm title="SHOWCASE" />
          <br />
          <br />
          <Title title="Fresh ideas. Bold design. Smart realisation." className="title-bg" />
        </motion.div>
        <br />
        <br />

        {/* ✅ Animated Grid */}
        <motion.div
          className="grid-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {showcase.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card data={item} caption={item.post} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ShowCase;
