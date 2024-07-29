const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User =  require('../models/user')
const Blog =  require('../models/blog')

usersRouter.get('/', async (request, response) => {
    try {
        const users =  await User.find({}).populate('blogs', {title: 1, likes: 1})
        response.json(users)
    } catch(error){
        console.error('Error fetching blogs', error)
        response.status(500).json({error: 'An error occurred while fetching blogs'})
    }
})

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash =  await bcryptjs.hash(password, saltRounds)

    const user =  new User({
        username,
        name,
        passwordHash
    })

    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch(error){
        next(error)
    }
})

module.exports =  usersRouter