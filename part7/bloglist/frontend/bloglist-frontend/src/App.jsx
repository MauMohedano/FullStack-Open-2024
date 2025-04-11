/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import { showNotification } from "./reducers/notificationreducer";
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
   dispatch(initializeBlogs())
  }, []);

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
      dispatch(likeBlog(blog))
      dispatch(showNotification(`Liked ${blog.title}`, 'success'))
    } catch (error) {
      dispatch(showNotification('Failed to like the blog', 'error'))
    }
  }
  
  const removeBlog = async (id) => {
    try {
      await dispatch(deleteBlog(id)); // esto es tu thunk de Redux
      dispatch(showNotification('Blog deleted', 'success'));
    } catch (err) {
      dispatch(showNotification('Remove failed', 'error'));
    }
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />

      {user ? (
        <BlogForm user={user} removeUser={removeUser} addBlog={addBlog} />
      ) : (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      )}

      <div>
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
  );
};

export default App;
//me quede en el minuto 20:38
