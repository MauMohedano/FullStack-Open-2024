const bcryptjs = require('bcryptjs')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcryptjs.hash('salasana', 10)
    const user =  new User({
        username: 'user',
        name: 'Stack Master',
        password: 'ultimateHax',
    })
    await user.save()
})

test('Duplicated username', async () => {
    const newUser = {
        username: 'user',
        name: 'Stack Master',
        password: 'ultimateHax',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const users = await api.get('/api/users')
    const usernames = users.body.map(user => user.username)
    expect(usernames).toContain(newUser.username)
})


test('Password is shorter than 3 chart', async () => {
    const newUser = {
        username: 'user',
        name: 'Stack Master',
        password: 'u',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const users = await api.get('/api/users')
    const usernames = users.body.map(user => user.username)
    expect(usernames).toContain(newUser.username)
})

afterAll(()=> {
    mongoose.connection.close()
})