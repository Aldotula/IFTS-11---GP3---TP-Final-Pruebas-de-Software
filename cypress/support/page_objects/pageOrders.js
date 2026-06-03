class PageOrders {

  validateOrdersPage() {
    cy.url().should('include', 'myorders');
    cy.contains('My Orders').should('be.visible');
  }

  validateOrderCreated(amount) {
    cy.get('table').should('be.visible');
    cy.contains(amount).should('be.visible');
  }

  openFirstOrder() {
    cy.get('tbody tr').first().click();
  }

}

export default new PageOrders();
``