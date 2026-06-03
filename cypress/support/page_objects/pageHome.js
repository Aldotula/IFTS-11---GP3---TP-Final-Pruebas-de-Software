class pageHome {

    isBookVisible() {
        cy.get('app-book-card')
          .contains('Harry Potter and the Chamber of Secrets')
          .should('be.visible')
    }

    // Método para validar libros luego de un filtro
    isAnyBookVisible() {
        cy.get('app-book-card')
          .should('have.length.greaterThan', 0)
    }

    clickAddToCartButton() {
        cy.get('button').contains('Add to Cart').click()
    }

}

module.exports = new pageHome();
``