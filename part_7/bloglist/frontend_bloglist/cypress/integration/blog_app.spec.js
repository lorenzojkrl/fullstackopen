describe('In blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'lorenzo',
            username: 'lorenzo',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function () {
        cy.contains('Blogs')
        cy.contains('Blogs, Department of Computer Science, University of Helsinki 2021')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('lorenzo')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('lorenzo logged-in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('lorenza')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('Wrong credentials')
            // Alternative ways when className="error" is set in Notification
            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', 'lorenzo logged-in')
        })
    })

    describe('When logged in', function () {
        // Test login flow only once, then login through backend, it's faster
        // Since we'll often use login, we create a custom command in cypress/support/command.js  
        beforeEach(function () {
            cy.login({ username: 'lorenzo', password: 'salainen' })
        })

        it('A blog can be created', function () {
            cy.contains('New Blog').click()
            cy.get('#title').type('A New Blog')
            cy.get('#author').type('Cypress')
            cy.get('#url').type('https://www.cypress.com')
            cy.get('#create-blog').click()

            cy.contains('A New Blog by Cypress')
        })
    })

    describe('When a blog exist', function () {
        beforeEach(function () {
            cy.login({ username: 'lorenzo', password: 'salainen' })
            cy.createBlog({ title: 'First Blog', author: 'Cypress', url: 'https://www.cypress.com' })
        })

        it('it is possible to like it', function () {
            cy.contains('View').click()
            cy.contains('like').click()
            cy.contains('1')
        })
    })

    describe.only('When a blog exist', function () {
        beforeEach(function () {
            cy.login({ username: 'lorenzo', password: 'salainen' })
            cy.createBlog({ title: 'First Blog', author: 'Cypress', url: 'https://www.cypress.com', likes: 2 })
            cy.contains('View').click()
        })

        it('it is possible to remove it', function () {
            cy.contains('remove').click()
            cy.on('window:confirm', (txt) => {
                expect(txt).to.contains('Delete First Blog ?');
            })

            cy.get('.success')
                .should('contain', 'First Blog has been deleted')
                .and('have.css', 'color', 'rgb(0, 128, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })

    describe.only('When there are many blogs', function () {
        beforeEach(function () {
            cy.login({ username: 'lorenzo', password: 'salainen' })
            cy.createBlog({ title: 'First Blog', author: 'Cypress', url: 'https://www.cypress.com', likes: 2 })
            cy.createBlog({ title: 'Second Blog', author: 'Cipresso', url: 'https://www.cypress.com', likes: 25 })
            cy.createBlog({ title: 'Third Blog', author: 'Mario', url: 'https://www.cypress.com', likes: 4 })
        })

        it('they are ordered by number of likes', function () {
            cy.get('.noDetails').first().contains('View').click()
            cy.contains('25')

            cy.get('.noDetails').last().contains('View').click()
            cy.contains('2')
        })
    })


})