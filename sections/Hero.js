import { useState, useEffect } from "react";
import { home } from "@/assets/data/dummydata";
import Banner from "@/components/Banner";
import Expertise from "@/components/Expertise";
import ShowCase from "@/components/ShowCase";
import Testimonial from "@/components/Testimonial";
import { Title, TitleLogo, TitleSm } from "@/components/common/Title";
import { BlogCard, Brand } from "@/components/router";
import React from "react";

const Hero = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Sort blogs by date (latest first) & take only the 2 most recent
          const sortedBlogs = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setBlogs(sortedBlogs.slice(0, 2)); // Only keep the latest 2 blogs
        }
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <TitleLogo title="Avien" caption=" AI" className="logobg" />
          <h1 className="hero-title">BUILDING INTELLIGENT DIGITAL SOLUTIONS</h1>

          <div className="sub-heading">
            <TitleSm title="BRANDING" /> <span>.</span>
            <TitleSm title="WEBSITES" /> <span>.</span>
            <TitleSm title="DIGITAL MARKETING" />
          </div>
        </div>
      </section>

      <section className="hero-sec">
        <div className="container">
          <div className="heading-title">
            <Title title="The last digital agency you’ll ever need" />
            <p>
              Suspendisse ut magna porttitor, sollicitudin ligula at, molestie dolor.
              Vivamus a ligula ut velit placerat egestas at id leo. Nulla ac volutpat nunc.
              Nulla facilisi. Pellentesque tempus tellus ut magna porttitor scelerisque.
            </p>
          </div>
          <div className="hero-content grid-4">
            {home.map((item, i) => (
              <div className="box" key={i}>
                <span className="green">{item.icon}</span> <br />
                <br />
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Expertise />
      <Banner />
      <Testimonial />
      <ShowCase />
      

      <div className="text-center">
        <Title title="Latest news & articles" />
      </div>

      {/* ✅ Display only 2 latest blogs */}
      <BlogCard blogs={blogs} />
    </>
  );
};

export default Hero;
