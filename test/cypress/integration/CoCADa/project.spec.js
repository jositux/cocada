
describe('Editor de proyecto', function() {
    it('Acceder al proyecto', function() {
        //cy.loginByForm('admin', 'admin')
        cy.loginAccount('client')

        cy.visit('http://localhost:3000/project/5bb3722915ae99010f55eef2')
        cy.contains('Reiniciar Parámetros') // TODO... 
    })


    describe('Editor CSG', function() {
        it('Escribir Código', function() {
            //cy.get('#editor textarea').type('function main()',  {"force": true});

            /*cy.get('#editor textarea').invoke('val', '{')
            .trigger('input', {"force": true})*/

            //cy.get('#editor textarea').type('return cube(10)',  {"force": true});

            cy.get('#editor textarea').invoke('val', 'function main(){\n\treturn cube(10)\n}')
            .trigger('input', {"force": true})
            
            cy.get('#editor textarea').type(" ",  {"force": true});
        })


      })
    
      describe('Visor 3D', function() {
        it('Girar la pieza', function() {
        })
      })
})
