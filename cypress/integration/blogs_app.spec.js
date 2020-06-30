describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Niklas Miller',
      username: 'dromastyx',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login from is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('dromastyx')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Niklas Miller logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('dromastyx')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('dromastyx')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.contains('create').click()

      cy.contains('a blog created by cypress')
      cy.contains('author')
    })

    it('a blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog')
      cy.get('#author').type('an author')
      cy.get('#url').type('a url')
      cy.contains('create').click()

      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('a blog can be removed', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Blog title')
      cy.get('#author').type('The author')
      cy.get('#url').type('The url')
      cy.contains('create').click()

      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('#blogDiv').should('not.contain', 'Blog title')
    })

    it('blogs are sorted by likes', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('title1')
      cy.get('#author').type('author1')
      cy.get('#url').type('url1')
      cy.contains('create').click()

      cy.contains('view').click()
      cy.contains('like').click()

      cy.get('#title').type('title2')
      cy.get('#author').type('author2')
      cy.get('#url').type('url2')
      cy.contains('create').click()

      cy.contains('view').click()

      cy.get('#blogDiv').children().eq(1).contains('like').then(($btn) => {
        cy.wrap($btn).click()
        cy.wait(500)
        cy.wrap($btn).click()
      })

      cy.wait(500)

      cy.get('#blogDiv').children().eq(0).contains('title2')
      cy.get('#blogDiv').children().eq(1).contains('title1')

    })

  })

})