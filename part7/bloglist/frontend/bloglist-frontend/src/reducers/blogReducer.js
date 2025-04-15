import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    commentBlog(state, action) {
        const { blogId, comment } = action.payload; 
        return state.map((blog) =>
          blog.id === blogId
            ? { ...blog, comments: blog.comments.concat(comment) }
            : blog
        );
      },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog, commentBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBlog);
    dispatch(appendBlog(createdBlog));
  };
};

export const addComment = (blogId, comment) => {
    return async (dispatch) => {
     await blogService.comment(blogId, comment); 
        dispatch(commentBlog({ blogId, comment })); 
      };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updated = { ...blog, likes: blog.likes + 1 };
    const returnedBlog = await blogService.update(blog.id, updated);
    dispatch(updateBlog(returnedBlog));
  };
};

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.remove(blogId);
    dispatch(removeBlog(blogId));
  };
};

export default blogSlice.reducer;
