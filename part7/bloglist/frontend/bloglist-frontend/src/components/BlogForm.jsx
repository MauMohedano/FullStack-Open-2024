/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useRef } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Togglable from "./Togglable";

const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const togglableRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    addBlog(blogObject);
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    togglableRef.current.toggleVisibility();
  };

  return (
    <Togglable buttonLabel="Create blog" ref={togglableRef}>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Create a new blog</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newTitle}
                onChange={({ target }) => setNewTitle(target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                value={newAuthor}
                onChange={({ target }) => setNewAuthor(target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter URL"
                value={newUrl}
                onChange={({ target }) => setNewUrl(target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Togglable>
  );
};

export default BlogForm;
