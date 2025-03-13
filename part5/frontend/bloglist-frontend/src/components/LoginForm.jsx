import { useState } from "react";
import Togglable from "./Togglable";

const LoginForm = ({
  username,
  password,
  handleLogin,
  handlePasswordChange,
  handleUsernameChange,
}) => {
 
  return (
    <Togglable buttonLabel='Show LOGIN'>
     
      <h2>Login</h2>
      <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            autoComplete="username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    
      </div>
    </Togglable>
  );
};

export default LoginForm;
