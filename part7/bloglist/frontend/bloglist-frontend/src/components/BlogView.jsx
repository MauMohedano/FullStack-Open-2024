/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addComment, likeBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationreducer";

import { Card, Button, Form, ListGroup } from "react-bootstrap";

const BlogView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  if (!blog) return <p>Loading blog...</p>;

  const handleLike = () => {
    dispatch(likeBlog(blog));
    dispatch(showNotification(`You liked '${blog.title}'`, "success", 3));
  };

  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value.trim();
    if (comment === "") return;
    dispatch(addComment(blog.id, comment));
    e.target.comment.value = "";
    dispatch(showNotification(`Comment added to '${blog.title}'`, "success", 3));
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">by {blog.author}</Card.Subtitle>

        <Card.Text>
          <strong>URL:</strong> <a href={blog.url}>{blog.url}</a>
        </Card.Text>

        <Card.Text>
          <strong>Likes:</strong> {blog.likes}{" "}
          <Button variant="success" size="sm" onClick={handleLike}>Like</Button>
        </Card.Text>

        <Card.Text>
          <strong>Added by:</strong> {blog.user?.name}
        </Card.Text>

        <hr />

        <h5>Comments</h5>
        <Form onSubmit={handleComment} className="mb-3">
          <Form.Group controlId="comment">
            <Form.Control type="text" name="comment" placeholder="Write a comment..." />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">Add Comment</Button>
        </Form>

        <ListGroup variant="flush">
          {blog.comments.map((c, i) => (
            <ListGroup.Item key={i}>{c}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default BlogView;
