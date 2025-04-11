import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; 
import BlogForm from "./BlogForm";
import Blog from "./Blog";

// eslint-disable-next-line no-undef
test("renders title and author, but not URL or likes by default", () => {
  const blog = {
    title: "Test react",
    author: "Mauricio",
    url: "www.google.com",
    user: "probando",
    id: "123123",
    likes: 21,
  };

  render(<Blog blog={blog} />);

  screen.getByText("Test react");
  screen.getByText("Mauricio");


  // eslint-disable-next-line no-undef
  expect(screen.queryByText("www.google.com")).toBeNull();
  // eslint-disable-next-line no-undef
  expect(screen.queryByText("Likes 21")).toBeNull();
});

// eslint-disable-next-line no-undef
test("clicking the like button twice calls event handler twice", async () => {
  const blog = {
    title: "Test react",
    author: "Mauricio",
    url: "www.google.com",
    user: "probando",
    id: "123123",
    likes: 0,
  };

  // eslint-disable-next-line no-undef
  const mockHandler = vi.fn();
  render(<Blog blog={blog} updateBlog={mockHandler} removeBlog={() => {}} />);

  const user = userEvent.setup();

  const viewButton = screen.getByText("View");
  await user.click(viewButton);

  const likeButton = screen.getByText("Like");
  await user.click(likeButton);
  await user.click(likeButton); // Segundo clic

  expect(mockHandler).toHaveBeenCalledTimes(2);
});

test("URL and likes are shown when 'View' button is clicked", async () => {
  const blog = {
    title: "Test react",
    author: "Mauricio",
    url: "www.google.com",
    user: "probando",
    id: "123123",
    likes: 21,
  };

  render(<Blog blog={blog} />);

 
  expect(screen.queryByText("www.google.com")).toBeNull();
  expect(screen.queryByText("Likes 21")).toBeNull();

  const viewButton = screen.getByText("View");
  await userEvent.click(viewButton);

 
  screen.getByText("www.google.com");
  screen.getByText("Likes 21");
});

test("clicking the like button twice calls event handler twice", async () => {
  const blog = {
    title: "Test react",
    author: "Mauricio",
    url: "www.google.com",
    user: "probando",
    id: "123123",
    likes: 0,
  };

  const mockHandler = vi.fn();
  render(<Blog blog={blog} updateBlog={mockHandler} removeBlog={() => {}} />);

  const user = userEvent.setup();


  const viewButton = screen.getByText("View");
  await user.click(viewButton);

  const likeButton = screen.getByText("Like");

  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler).toHaveBeenCalledTimes(2);
});

test("clicking the like button twice calls event handler twice", async () => {
  const blog = {
    title: "Test react",
    author: "Mauricio",
    url: "www.google.com",
    user: "probando",
    id: "123123",
    likes: 0,
  };

  const mockHandler = vi.fn();
  render(<Blog blog={blog} updateBlog={mockHandler} removeBlog={() => {}} />);

  const user = userEvent.setup();

  const viewButton = screen.getByText("View");
  await user.click(viewButton);

  const likeButton = screen.getByText("Like");

  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler).toHaveBeenCalledTimes(2);
});


test("new blog form calls event handler with correct details", async () => {
  const createBlog = vi.fn();
  
  render(<BlogForm user={{ name: "Test User" }} addBlog={createBlog} />);
  
  const titleInput = screen.getByPlaceholderText("Title");
  const authorInput = screen.getByPlaceholderText("Author");
  const urlInput = screen.getByPlaceholderText("Url");
  const saveButton = screen.getByText("save");
  
  await userEvent.type(titleInput, "Test Blog Title");
  await userEvent.type(authorInput, "Test Author");
  await userEvent.type(urlInput, "https://example.com");

  await userEvent.click(saveButton);
  
  expect(createBlog).toHaveBeenCalledWith({
    title: "Test Blog Title",
    author: "Test Author",
    url: "https://example.com",
  });
});