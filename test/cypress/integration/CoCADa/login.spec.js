function doLogin (cy) {
    cy.visit('/user/login')
    
    cy.get('[data-cy=login-username]')
    .type('admin').should('have.value', 'admin')

    cy.get('[data-cy=login-password]')
    .type('admin').should('have.value', 'admin')

    cy.get('[data-cy=login-submit]').click()

    cy.get('[data-cy=status-success]').contains('Acceso Correcto.');
}

function doLogout (cy) {
    cy.get('[data-cy=session-menu]').click()
    
    cy.get('[data-cy=logout]').contains('Cerrar Sesión').click()

    cy.get('[data-cy=dialog-logout]').click()
    
    cy.location('pathname').should('eq', '/user/login')
}

describe('CoCADa (frontend) en línea', function() {
    it('Página de Inicio => Inicio de Sesión', function() {
      cy.visit('')
    
      // Redirect to login
      cy.location('pathname').should('eq', '/user/login')
      cy.get('[data-cy=form-login]')
    })
})

describe('Sesión de usuario', function() {
    it('Inicio de Sesión Validación', function() {
        cy.visit('/user/login')

        cy.get('[data-cy=login-username]')
            .type('--')
            .clear()
        
        cy.get('.input-group__messages') // ¿better target?
            .contains('El nombre de Usuario es obligatorio.')

        cy.get('[data-cy=login-username]')
            .clear()
            .type('012345678901234567890')
        
        cy.get('.input-group__messages') // ¿better target?
            .contains('El nombre de usuario debe ser menor a 20 caracteres.')


        cy.get('[data-cy=login-password]')
            .type('--')
            .clear()

        cy.get('.input-group__messages')
            .contains('La Contraseña es obligatoria.')

        
        cy.get('[data-cy=login-password]')
            .clear()
            .type('012345678901234567890')

        cy.get('.input-group__messages')
            .contains('La Contraseña debe ser menor a 20 caracteres.')

      })

    it('Inicio de Sesión Correcto', function() {
        doLogin(cy)
      })

      it('Inicio de Sesión Incorrecto', function() {
        cy.visit('/user/login')
    
        cy.get('[data-cy=login-username]')
        .type('?????????').should('have.value', '?????????')

        cy.get('[data-cy=login-password]')
        .type('!!!!!!!!!').should('have.value', '!!!!!!!!!')


        cy.get('[data-cy=login-submit]')
        .click()
    
        cy.get('[data-cy=status-error]').contains('Ocurrió un error.');
      })

      it('Cerrar Sesión', function() {
        doLogin(cy)
        doLogout(cy)
      })
})
