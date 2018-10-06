describe('API (backend) en línea', function() {
    it('Explorardor de API', function() {
      cy.visit(Cypress.env('host_api') + '/explorer')
      
      cy.get('#logo').contains('StrongLoop API Explorer')
    })
  })