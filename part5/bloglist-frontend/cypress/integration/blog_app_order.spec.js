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

  describe('When logged in, blogs are ordered by likes', function() {
    beforeEach(function() {
      cy.get('#username').type('peterpan')
      cy.get('#password').type('peterpass')
      cy.get('#login-button').click()
      cy.get('#Addnewblog').click()

      cy.get('#TitleInput').type('wool\'s blog 1')
      cy.get('#AuthorInput').type('wool')
      cy.get('#UrlInput').type('https://woolwarrior.co.uk/')
      cy.get('#add-blog-button').click()

      cy.get('#Addnewblog').click()
      cy.get('#TitleInput').type('wool\'s blog 2')
      cy.get('#AuthorInput').type('wool')
      cy.get('#UrlInput').type('https://woolwarrior.co.uk/2')
      cy.get('#add-blog-button').click()

      cy.get('#Addnewblog').click()
      cy.get('#TitleInput').type('wool\'s blog 3')
      cy.get('#AuthorInput').type('wool')
      cy.get('#UrlInput').type('https://woolwarrior.co.uk/2')
      cy.get('#add-blog-button').click()
    })
    it('A blog can be created', function() {
      cy.wait(1000)
      cy.get('.viewButtonClass').then(($viewButtons) => {
        console.log($viewButtons[0])
        $viewButtons[0].click()
        console.log($viewButtons[1])
        $viewButtons[1].click()
        console.log($viewButtons[2])
        $viewButtons[2].click()
      })
      cy.get('.likeClass').then(($likeButton) => {
        console.log($likeButton[0])
        $likeButton[0].click()
        console.log($likeButton[1])
        $likeButton[1].click()
        console.log($likeButton[2])
        $likeButton[2].click()
      })
      cy.wait(1000)
      cy.reload()
      cy.get('.viewButtonClass').then(($viewButtons) => {
        console.log($viewButtons[0])
        $viewButtons[0].click()
        console.log($viewButtons[1])
        $viewButtons[1].click()
      })
      cy.get('.likeClass').then(($likeButton) => {
        console.log($likeButton[0])
        $likeButton[0].click()
        console.log($likeButton[1])
        $likeButton[1].click()
      })
      cy.wait(1000)
      cy.reload()
      cy.get('.viewButtonClass').then(($viewButtons) => {
        console.log($viewButtons[1])
        $viewButtons[1].click()
      })
      cy.get('.likeClass').then(($likeButton) => {
        console.log($likeButton[0])
        $likeButton[0].click()
      })
    })
  })


})