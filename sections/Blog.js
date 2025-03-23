import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { Title, TitleSm } from "@/components/common/Title";
import React from "react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <section className="agency bg-top">
      <div className="container">
        {/* ✅ Animated Heading */}
        <motion.div
          className="heading-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <TitleSm title="BLOG" /> <br />
          <br />
          <Title title="Our views on marketing, design & technology" />
        </motion.div>

        {/* ✅ Animated Blog Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <BlogCard blogs={blogs} />
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
