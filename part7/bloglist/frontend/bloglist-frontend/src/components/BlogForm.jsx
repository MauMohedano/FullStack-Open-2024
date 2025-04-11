/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Blog from "./Blog";
import { useState, useRef } from "react";
import Togglable from "./Togglable";

const BlogForm = ({ user, addBlog, removeUser }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const togglableRef = useRef()
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    addBlog(blogObject)
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    togglableRef.current.toggleVisibility()
  };

  return (
    <Togglable buttonLabel="Create blog" ref={togglableRef}>
      <div>
        <h2>
          <div>
            Welcome {user.name}
            <button onClick={removeUser}>log out</button>
          </div>
        </h2>
      </div>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                placeholder="Title"
                value={newTitle}
                onChange={handleTitleChange}
              />
            </div>
            <div>
              {" "}
              <input
                placeholder="Author"
                value={newAuthor}
                onChange={handleAuthorChange}
              />
            </div>
            <div>
              {" "}
              <input
                placeholder="Url"
                value={newUrl}
                onChange={handleUrlChange}
              />
            </div>
            <button type="submit">save</button>
          </form>
        </div>
      </div>
    </Togglable>
  );
};

export default BlogForm;
