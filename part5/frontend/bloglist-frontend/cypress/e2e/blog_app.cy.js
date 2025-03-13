describe('Blog app', () => {
  it('front page can be opened', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Blogs') // 
  })

  
})


describe('Login form test', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown by default when no user is logged in', function () {
    cy.get('button').contains('Show LOGIN').click()  
    cy.get('input[name="Username"]').should('be.visible')
    cy.get('input[name="Password"]').should('be.visible')
    cy.get('button[type="submit"]').contains('login').should('be.visible')
  })
})


describe('Login escenario test', function () {
  beforeEach(function () {
    const user = {
      name: 'Test User',
      username: 'testuser' + Date.now(),
      password: 'password123',
    }
    cy.request('POST', 'http://localhost:5173/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.get('button').contains('Show LOGIN').click()
    cy.get('input[name="Username"]').should('be.visible')
    cy.get('input[name="Password"]').should('be.visible')
    cy.get('button[type="submit"]').contains('login').should('be.visible')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="Username"]').type('testuser')
      cy.get('input[name="Password"]').type('password123')
      cy.get('button[type="submit"]').contains('login').click()
      cy.contains('Test User logged in').should('be.visible')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="Username"]').type('wronguser')
      cy.get('input[name="Password"]').type('wrongpassword')
      cy.get('button[type="submit"]').contains('login').click()
      cy.contains('Wrong Credentials').should('be.visible')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})


describe('Add blog', function() {
  beforeEach(function() {
    const user = {
      name: 'Test User',
      username: 'testuser' + Date.now(),
      password: 'password123',
    }
    cy.request('POST', 'http://localhost:5173/api/users', user)
    cy.visit('http://localhost:5173')
    cy.get('button').contains('Show LOGIN').click()
    cy.get('input[name="Username"]').type(user.username)
    cy.get('input[name="Password"]').type(user.password)
    cy.get('button[type="submit"]').contains('login').click()
    cy.contains('Test User logged in').should('be.visible')
  })

  describe('When logged in', function() {
    it('A blog can be created', function() {
      cy.get('button').contains('Create Blog').click()
      cy.get('input[name="title"]').type('Test Blog Title')
      cy.get('input[name="author"]').type('Test Author')
      cy.get('input[name="url"]').type('http://example.com')
      cy.get('button').contains('Create').click()
      cy.contains('Test Blog Title').should('be.visible')
      cy.contains('Test Author').should('be.visible')
    })
  })
})

describe('Blog app', function() {
  beforeEach(function() {
    const user = {
      name: 'Test User',
      username: 'testuser' + Date.now(),
      password: 'password123',
    }
    cy.request('POST', 'http://localhost:5173/api/users', user)
    cy.visit('http://localhost:5173')
    cy.get('button').contains('Show LOGIN').click()
    cy.get('input[name="Username"]').type(user.username)
    cy.get('input[name="Password"]').type(user.password)
    cy.get('button[type="submit"]').contains('login').click()
    cy.contains('Test User logged in').should('be.visible')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('button').contains('Create Blog').click()
      cy.get('input[name="title"]').type('Test Blog Title')
      cy.get('input[name="author"]').type('Test Author')
      cy.get('input[name="url"]').type('http://example.com')
      cy.get('button').contains('Create').click()
      cy.contains('Test Blog Title').should('be.visible')
    })

    it('A blog can be liked', function() {
      cy.get('.blog').contains('Test Blog Title').find('button').contains('Like').click()
      cy.get('.blog').contains('Test Blog Title').should('contain', 'Likes: 1')
    })

    it('A blog can be deleted by the creator', function() {
      cy.get('.blog').contains('Test Blog Title').find('button').contains('Delete').click()
      cy.get('.blog').should('not.exist')
    })

    it('Only the creator can see the delete button', function() {
      const anotherUser = {
        name: 'Another User',
        username: 'anotheruser' + Date.now(),
        password: 'password123',
      }
      cy.request('POST', 'http://localhost:5173/api/users', anotherUser)
      cy.visit('http://localhost:5173')
      cy.get('button').contains('Show LOGIN').click()
      cy.get('input[name="Username"]').type(anotherUser.username)
      cy.get('input[name="Password"]').type(anotherUser.password)
      cy.get('button[type="submit"]').contains('login').click()
      cy.contains('Another User logged in').should('be.visible')
      cy.get('.blog').contains('Test Blog Title').find('button').contains('Delete').should('not.exist')
    })

    it('Blogs are sorted by likes', function() {
      cy.get('.blog').eq(0).should('contain', 'Test Blog Title')
      cy.get('.blog').eq(1).should('not.contain', 'Test Blog Title')
    })
  })
})


