// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Permite hacer login con usuario y contraseña.
Cypress.Commands.add('loginByForm', (username, password) => {
    cy.visit('/user/login')
    
    cy.get('[data-cy=login-username]')
    .type(username).should('have.value', username)

    cy.get('[data-cy=login-password]')
    .type(username).should('have.value', password)

    cy.get('[data-cy=login-submit]').click()

    return cy.get('[data-cy=status-success]').contains('Acceso Correcto.');
});


// Permite hacer login con cuentas predefinidas en el archivo
// de configuraciones de cypress
Cypress.Commands.add('loginAccount', (user) => {
    var account = Cypress.env(user + '_account') 
    return cy.loginByForm(account.username, account.password)
});