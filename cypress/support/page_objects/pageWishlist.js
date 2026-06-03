class PageWishlist {

  isWishlistNotEmpty() {
    cy.get('tr.mat-mdc-row')
      .should('have.length.greaterThan', 0);
  }

  removeFirstBook() {
    cy.get('button.wishlisted')
      .first()
      .should('be.visible')
      .click();
  }

}

export default new PageWishlist();
``