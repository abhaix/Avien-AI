import React from "react";
import { Card } from "./common/Card";

const BlogCard = ({ blogs = [] }) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return <p className="text-center">No blogs available.</p>;
  }

  return (
    <div className="container blog-card grid-2 py">
      {blogs.map((item, index) => (
        <Card data={item} key={item.id || index} path="blogs" />
      ))}
    </div>
  );
};

export default BlogCard;
