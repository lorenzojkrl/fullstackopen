describe('In blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Lorenzo Z',
            username: 'lorenzozar',
            password: 'password'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function () {
        cy.contains('blogs')
        cy.contains('Blogs, Department of Computer Science, University of Helsinki 2020')
    })

    describe('login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('lorenzozar')
            cy.get('#password').type('password')
            cy.get('#login-btn').click()

            cy.contains('lorenzozar logged-in')
        })

        it('fails with wrong credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('lorenzozar')
            cy.get('#password').type('sekret')
            cy.get('#login-btn').click()

            cy.contains('Wrong credentials')
        })
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.contains('login').click()
            cy.get('#username').type('lorenzozar')
            cy.get('#password').type('password')
            cy.get('#login-btn').click()
        })

        it('a new blog can be created', function () {
            cy.contains('New Blog').click()
            cy.get('#title').type('A blog created by cypress')
            cy.get('#author').type('cypress')
            cy.get('#url').type('https://docs.cypress.io/guides/')

            cy.contains('Create Blog').click()
            // The following content appears only in the blog added to the list of blogs
            // therefore, a new blog is added to the list of all blogs.
            cy.contains('A blog created by cypress by cypress')
        })
    })

    describe('when logged in & a blog exists', function () {
        beforeEach(function () {
            cy.contains('login').click()
            cy.get('#username').type('lorenzozar')
            cy.get('#password').type('password')
            cy.get('#login-btn').click()
            cy.contains('New Blog').click()
            cy.get('#title').type('A blog created by cypress')
            cy.get('#author').type('cypress')
            cy.get('#url').type('https://docs.cypress.io/guides/')
            cy.contains('Create Blog').click()
        })

        it('the user can like a blog', function () {
            cy.contains('view').click()
            cy.contains('Like ').click()

            cy.get('html').should('contain', 'Likes: 1')
        })
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.contains('login').click()
            cy.get('#username').type('lorenzozar')
            cy.get('#password').type('password')
            cy.get('#login-btn').click()
            cy.contains('New Blog').click()
            cy.get('#title').type('A blog created by cypress')
            cy.get('#author').type('cypress')
            cy.get('#url').type('https://docs.cypress.io/guides/')
            cy.contains('Create Blog').click()
        })

        it('a user can delete his blog', function () {
            cy.contains('view').click()
            cy.contains('Remove ').click()

            cy.get('html').should('not.contain', 'A blog created by cypress')
        })
    })

    // Refactor everything following https://fullstackopen.com/en/part5/end_to_end_testing#bypassing-the-ui

    describe.only('blogs are ordered according to likes', function () {
        beforeEach(function () {
            cy.contains('login').click()
            cy.get('#username').type('lorenzozar')
            cy.get('#password').type('password')
            cy.get('#login-btn').click()

            cy.contains('New Blog').click()
            cy.get('#title').type('A blog created by cypress')
            cy.get('#author').type('cypress1')
            cy.get('#url').type('https://docs.cypress.io/guides/')
            cy.contains('Create Blog').click()


            cy.contains('New Blog').click()
            cy.get('#title').type('A Second blog created by cypress')
            cy.get('#author').type('cypress2')
            cy.get('#url').type('https://docs.cypress.io/guides/')
            cy.contains('Create Blog').click()

            cy.contains('New Blog').click()
            cy.get('#title').type('A Third blog created by cypress')
            cy.get('#author').type('cypress3')
            cy.get('#url').type('https://docs.cypress.io/guides/')
            cy.contains('Create Blog').click()
        })

        it('with the blog with the most likes being first.', function () {

            cy.get('button').then(buttons => {
                console.log('number of buttons', buttons.length)
                cy.wrap(buttons[8]).click()
                cy.wrap(buttons[9]).click()
            })

            cy.contains('blog created by cypress').parent().contains('cypress2')
        })
    })
})

// In case of linting errors
// npm install eslint-plugin-cypress --save-dev
// & change the configuration in .eslintrc.js 
// so that within module.exports:
// "env": {"cypress/globals": true}
// "plugins": ["react", "jest", "cypress"]