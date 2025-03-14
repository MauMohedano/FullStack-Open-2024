/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
 
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
    setMessage({ message, type });
    setTimeout(() => {
      setMessage();
    }, 5000);
  };

  const addBlog = (blogObject) => {
       blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
     
    });
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
    messageHandler(`User logged out.`, "success");
  };

  const updateBlog = async (blog) => {
    try {
      await blogService.update(blog.id, blog)
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a,b)=> b.likes - a.likes))
      
    }
    catch(exception){
      messageHandler("Like failed", "error");
    }
  }

  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      const newBlogs = blogs.filter((blog) => blog.id !== blogId)
      setBlogs(newBlogs)
      messageHandler('blog deleted')
    } catch (err) {
      messageHandler("Renmoved failed", "error")
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />

      {user ? 
      <BlogForm
      user={user}
      removeUser={removeUser}
      addBlog={addBlog}
      
      />: 
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />}

      <div>
        {blogs.map((blog) => (
          <Blog 
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
//me quede en el minuto 20:38