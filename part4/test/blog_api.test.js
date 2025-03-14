const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app'); 
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length);
});

test('Identifying field is named id', async ()=> {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('A new blog is added', async () => {

  const newBlog = {
    title: "Testing ",
    author: "Mauricio Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  }
    await api
    .post('/api/blogs')
    .send(newBlog)
  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(initialBlogs.length  + 1)
})

test('default likes is 0', async () => {

  const newBlog = {
    title: "Testing ",
    author: "Mauricio Chan",
    url: "https://reactpatterns.com/"
    
  }
    await api
    .post('/api/blogs')
    .send(newBlog)
  
  const res = await api.get('/api/blogs')
  expect(res.body[2].likes).toBe(0)
})

test('Title and Url is needed', async () => {

  const newBlog = {
    author: "Mauricio Chan",
    url: "https://reactpatterns.com/"
    
  }
  await api
  .post("/api/blogs")
  .send(newBlog)
  .expect(400);
})

test('Deleted blog', async () => {

  const newBlog = {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  }

  const result = await api
  .post('/api/blogs')
  .send(newBlog)
  
  const res =  await api.get(`/api/blogs/${result.body.id}`)
  const delBlog = await api
  .delete(`/api/blogs/${res.body.id}`)
  expect(delBlog.status).toBe(204)
})

test('Update blog', async () => {

  const newBlog = {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  }

  const result = await api
  .post('/api/blogs')
  .send(newBlog)

  newBlog.likes += 1

  
  await api.put(`/api/blogs/${result.body.id}`)
  .send(newBlog)
  const res = await api.get(`/api/blogs/${result.body.id}`)
  expect(res.body.likes).toBe(newBlog.likes)
})


afterAll(async () => {
  await mongoose.connection.close(); 
});
