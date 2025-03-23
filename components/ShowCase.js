import React from "react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import { Title } from "./common/Title";
import { showcase } from "@/assets/data/dummydata";
import { Card } from "./common/CaseCard";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";

const ShowCase = () => {
  return (
    <section className="showcase">
      <div className="container">
        {/* ✅ Heading with Animation */}
        <motion.div
          className="heading-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title title="Selected Cases" />
        </motion.div>

        {/* ✅ Grid with Animated Cards */}
        <motion.div
          className="hero-content grid-3 py"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {showcase.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
            >
              <Card data={item} />
            </motion.div>
          ))}
        </motion.div>

        {/* ✅ View All Cases Button */}
        <motion.div
          className="card links"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/showcase">
            VIEW ALL CASES <HiOutlineArrowRight className="link-icon" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowCase;
