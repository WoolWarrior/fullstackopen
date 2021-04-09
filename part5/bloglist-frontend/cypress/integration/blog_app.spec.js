describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Peter Pan',
      username: 'peterpan',
      password: 'peterpass'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be seen', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('peterpan')
      cy.get('#password').type('peterpass')
      cy.get('#login-button').click()
      cy.contains('peterpan Logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('peterpan')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('invalid username or password')
    })
  })

  describe('When logged in, a user can add a blog', function() {
    beforeEach(function() {
      cy.get('#username').type('peterpan')
      cy.get('#password').type('peterpass')
      cy.get('#login-button').click()
    })
    it('A blog can be created', function() {
      cy.get('#Addnewblog').click()
      cy.get('#TitleInput').type('wool\'s blog')
      cy.get('#AuthorInput').type('wool')
      cy.get('#UrlInput').type('https://woolwarrior.co.uk/')
      cy.get('#add-blog-button').click()
      cy.contains('wool\'s blog')
    })
  })

  describe('When logged in, a user can like a blog', function() {
    beforeEach(function() {
      cy.get('#username').type('peterpan')
      cy.get('#password').type('peterpass')
      cy.get('#login-button').click()
      cy.get('#Addnewblog').click()
      cy.get('#TitleInput').type('wool\'s blog')
      cy.get('#AuthorInput').type('wool')
      cy.get('#UrlInput').type('https://woolwarrior.co.uk/')
      cy.get('#add-blog-button').click()
    })
    it('A blog can be created', function() {
      cy.contains('view').click()
      cy.contains('like').click()
    })
  })

  describe('When logged in, a user can delete a blog', function() {
    beforeEach(function() {
      cy.get('#username').type('peterpan')
      cy.get('#password').type('peterpass')
      cy.get('#login-button').click()
      cy.get('#Addnewblog').click()
      cy.get('#TitleInput').type('wool\'s blog')
      cy.get('#AuthorInput').type('wool')
      cy.get('#UrlInput').type('https://woolwarrior.co.uk/')
      cy.get('#add-blog-button').click()
    })
    it('A blog can be created', function() {
      cy.contains('view').click()
      cy.contains('Remove').click()
    })
  })

})