class PageHome {

  isBookVisible() {
    cy.get('app-book-card')
      .should('have.length.greaterThan', 0);

    cy.contains('Harry Potter and the Chamber of Secrets')
      .should('be.visible');
  }

  isAnyBookVisible() {
    cy.get('app-book-card')
      .should('have.length.greaterThan', 0);
  }

  clickAddToCartButton() {
    cy.contains('button', 'Add to Cart').click();
  }

  filterByCategory(categoryName) {
    cy.contains(categoryName)
      .should('be.visible')
      .click();
  }

  validateItemAddedMessage() {
    cy.contains('One Item added to cart')
      .should('be.visible');
  }

}

export default new PageHome();