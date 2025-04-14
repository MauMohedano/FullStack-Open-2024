import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUsers } from '../reducers/userReducer';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);

 

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  console.log('Users in state:', users); 
 
  if (!users) {
    return <p>Loading users...</p>;
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Blogs creados</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name} ({user.username})</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
