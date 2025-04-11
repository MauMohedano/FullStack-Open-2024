/* eslint-disable react/prop-types */
import React, { useState } from "react";

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes ,
    };
    updateBlog(updatedBlog);
  };

  const handleDelete = async () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
    if (!ok) return;
  
    try {
      await removeBlog(blog.id); 
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {!visible ? (
          <div>
            <p>
              {blog.title} <button onClick={toggleVisibility}>View</button>
            </p>
            <p>{blog.author}</p>
          </div>
        ) : (
          <div>
            <p>{blog.title}</p>
            <p>{blog.author}</p>
            <p>{blog.url}</p>
            <p>
              Likes {blog.likes} <button onClick={handleLike}>Like</button>
            </p>
            <button onClick={toggleVisibility}>Hide</button>
          </div>
        )}
        <button onClick={handleDelete}>Remove</button>
      </div>
    </div>
  );
};

export default Blog;
