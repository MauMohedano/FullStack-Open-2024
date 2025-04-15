import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUsers } from '../reducers/userReducer';
import { Link } from "react-router-dom";

import { Container, Table, Spinner } from "react-bootstrap";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  if (!users) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Cargando usuarios...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Usuarios</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Blogs creados</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserList;
