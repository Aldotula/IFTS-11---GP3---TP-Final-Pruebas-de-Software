class PageCart {

  validateCartPage() {
    cy.contains('Shopping cart').should('be.visible');
  }

  validateProductInCart() {
    cy.contains('Harry Potter').should('be.visible');
  }

  validateTotal(amount) {
    cy.contains('td', `₹${amount}`).should('be.visible');
  }

  clickCheckout() {
    cy.contains('button', 'CheckOut')
      .should('be.visible')
      .click();
  }

}

export default new PageCart();