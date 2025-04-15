import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Container, Spinner, Card, ListGroup } from "react-bootstrap";

const UserDetail = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.user);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = users.find((user) => user.id === id);
    setUser(foundUser);
  }, [id, users]);

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Cargando detalles del usuario...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="shadow">
        <Card.Body>
          <Card.Title className="mb-4">
            <h2>{user.name}</h2>
          </Card.Title>
          <h4>Blogs creados</h4>
          {user.blogs.length === 0 ? (
            <p>Este usuario no ha creado blogs aún.</p>
          ) : (
            <ListGroup>
              {user.blogs.map((blog) => (
                <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserDetail;
