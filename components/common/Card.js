import Link from "next/link";
import { TitleSm } from "./Title";
import { HiOutlineArrowRight } from "react-icons/hi";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

export const Card = ({ data, caption, show, path }) => {
  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }} // ✅ Hover effect
    >
      <motion.div 
        className="card-img"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <img src={data.cover} alt={data.title} />
      </motion.div>

      <motion.div 
        className="card-details"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Link href={`${path}/${data.id}`} className="title-link">
          <TitleSm title={data.title} />
        </Link>
        {caption && (
          <Link href={`${path}/${data.id}`} className="caption-link">
            {caption} <HiOutlineArrowRight className="link-icon" />
          </Link>
        )}
        <div className="flex">
          <span>{data.catgeory}</span> {data.date && <span>/ {data.date}</span>}
        </div>

        {show && (
          <motion.ul 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {data.desc.map((text, i) => (
              <li key={i}> - {text.text}</li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </motion.div>
  );
};
