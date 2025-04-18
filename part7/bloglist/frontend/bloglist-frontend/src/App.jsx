/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Welcome from "./components/Welcome";
import UserDetail from "./components/UserDetail";
import BlogView from "./components/BlogView";
import { showNotification } from "./reducers/notificationreducer";
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "./reducers/userReducer";
import UserList from "./components/UserList";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const messageHandler = (message, type) => {
    dispatch(showNotification(message, type, 5));
  };

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject));
    messageHandler(
      `A new blog titled ${blogObject.title} by ${blogObject.author} added`,
      "success"
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      messageHandler(`Dear ${user.name}, Welcome!`, "success");
    } catch (exception) {
      messageHandler("Wrong Credentials", "error");
    }
  };

  const removeUser = () => {
    setUser(null);
    blogService.setToken(user.token);
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(showNotification(`User logged out.`, "success"));
  };

  const updateBlog = async (blog) => {
    try {
      dispatch(likeBlog(blog));
      dispatch(showNotification(`Liked ${blog.title}`, "success"));
    } catch (error) {
      dispatch(showNotification("Failed to like the blog", "error"));
    }
  };

  const removeBlog = async (id) => {
    try {
      await dispatch(deleteBlog(id));
      dispatch(showNotification("Blog deleted", "success"));
    } catch (err) {
      dispatch(showNotification("Remove failed", "error"));
    }
  };

  if (!user) {
    return (
      <Container className="mt-5">
        <h1>Blogs</h1>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </Container>
    );
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            BlogApp
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/users">
              Users
            </Nav.Link>
          </Nav>
          <span className="text-light me-3">Logged in as {user.name}</span>
          <Button variant="outline-light" onClick={removeUser}>
            Logout
          </Button>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Notification />
        <Welcome user={user} removeUser={removeUser} />

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <BlogForm user={user} removeUser={removeUser} addBlog={addBlog} />
                <div className="mt-4">
                  {blogs.map((blog) => (
                    <Blog
                      updateBlog={updateBlog}
                      removeBlog={removeBlog}
                      key={blog.id}
                      blog={blog}
                    />
                  ))}
                </div>
              </div>
            }
          />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
