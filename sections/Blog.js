import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { Title, TitleSm } from "@/components/common/Title";
import React from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <section className='agency bg-top'>
      <div className='container'>
        <div className='heading-title'>
          <TitleSm title='BLOG' /> <br />
          <br />
          <Title title='Our views on marketing, design & technology' />
        </div>
        <BlogCard blogs={blogs} />
      </div>
    </section>
  );
};

export default Blog;
