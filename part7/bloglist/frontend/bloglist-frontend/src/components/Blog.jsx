/* eslint-disable react/prop-types */
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          <Link to={`/blogs/${blog.id}`} style={{ textDecoration: "none" }}>
            {blog.title} - {blog.author}
          </Link>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Blog;

