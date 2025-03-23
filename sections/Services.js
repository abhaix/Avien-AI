import { expertise } from "@/assets/data/dummydata";
import { Card } from "@/components/common/CaseCard";
import { Title, TitleSm } from "@/components/common/Title";
import React from "react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

const Services = () => {
  return (
    <>
      {/* ✅ Services Section with animations */}
      <section className="agency bg-top">
        <div className="container">
          {/* ✅ Animated Heading */}
          <motion.div
            className="heading-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <TitleSm title="SERVICES" /> <br />
            <br />
            <Title title="Unique technologies & modern approach" className="title-bg" />
          </motion.div>

          {/* ✅ Animated Service Cards */}
          <motion.div
            className="grid-2 py"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {expertise.map((item) => (
              <motion.div 
                key={item.id} 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card data={item} caption={item.post} show={true} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
