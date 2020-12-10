describe('Blog app', function () {
    beforeEach(function () {
        // cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('blogs')
        cy.contains('Blogs, Department of Computer Science, University of Helsinki 2020')
    })

    it('user can login', function () {
        cy.contains('login').click()
        cy.get('input:first').type('root')
        cy.get('input:last').type('sekret')
    })
})