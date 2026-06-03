class ComponentNav {

  validationNumberCartBadge(cant) {
    cy.get('#mat-badge-content-0')
      .should('be.visible')
      .and('contain', cant);
  }

  goToCart() {
    cy.contains('button', 'shopping_cart')
      .should('be.visible')
      .click();
  }

}

export default new ComponentNav();