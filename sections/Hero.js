import { useState, useEffect } from "react";
import { home } from "@/assets/data/dummydata";
import Banner from "@/components/Banner";
import Expertise from "@/components/Expertise";
import ShowCase from "@/components/ShowCase";
import Testimonial from "@/components/Testimonial";
import { Title, TitleLogo, TitleSm } from "@/components/common/Title";
import { BlogCard, Brand } from "@/components/router";
import React from "react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

const Hero = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const sortedBlogs = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setBlogs(sortedBlogs.slice(0, 2));
        }
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <>
      {/* ✅ Hero Section with animation */}
      <section className="hero">
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <TitleLogo title="Avien" caption=" AI" className="logobg" />
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            BUILDING INTELLIGENT DIGITAL SOLUTIONS
          </motion.h1>

          <motion.div 
            className="sub-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TitleSm title="AI AUTOMATION" /> <span>.</span>
            <TitleSm title="INDUSTRIAL SOFTWARES" /> <span>.</span>
            <TitleSm title="SMART BUSINESS SOLUTIONS" />
          </motion.div>
        </motion.div>
      </section>

      {/* ✅ Hero-Section with animation */}
      <section className="hero-sec">
        <div className="container">
          <motion.div 
            className="heading-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Title title="The last digital agency you’ll ever need" />
            <p>
              Let it hang out with a great carrier, with the pleading ligament, with the pain of trouble. 
              Let us live by a ligament, so that the will may please the outflows at the id leo. Nothing about the present roll. 
              Nothing easy. The time of the fur-bearing cloak with the great carrier of the scaly cloak.
            </p>
          </motion.div>

          <motion.div 
            className="hero-content grid-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {home.map((item, i) => (
              <motion.div 
                className="box" 
                key={i}
                whileHover={{ scale: 1.1 }} // ✅ Hover effect
              >
                <span className="green">{item.icon}</span> <br />
                <br />
                <h3>{item.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ✅ Our Expertise Section */}
      <motion.section 
        className="expertise-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Expertise />
      </motion.section>

      {/* ✅ Banner Section */}
      <motion.section 
        className="banner-section"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Banner />
      </motion.section>

      {/* ✅ WHAT CLIENTS SAY ABOUT OUR WORK (Testimonial) */}
      <motion.section 
        className="testimonial-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Testimonial />
      </motion.section>

      {/* ✅ Selected Cases (ShowCase) */}
      <motion.section 
        className="showcase-section"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <ShowCase />
      </motion.section>

      {/* ✅ Blog Section with animations */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Title title="Latest news & articles" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <BlogCard blogs={blogs} />
      </motion.div>
    </>
  );
};

export default Hero;
