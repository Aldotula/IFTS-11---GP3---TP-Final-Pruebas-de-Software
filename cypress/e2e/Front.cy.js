import user from '../fixtures/user.json';
import url from '../fixtures/url.json';

import pageHome from '../support/page_objects/pageHome';
import componentNav from '../support/page_objects/componentNav';
import pageWishlist from '../support/page_objects/pageWishlist';
import pageCart from '../support/page_objects/pageCart';
import pageCheckout from '../support/page_objects/pageCheckout';
import pageOrders from '../support/page_objects/pageOrders';

describe('Casos de prueba de FRONT', () => {

it('Comprar carrito exitosamente y visualizar orden de compra', () => {
  cy.deleteCartAPI(user.userId);
  cy.login(user.username, user.password);
  cy.url().should('include', url.home);
  pageHome.isBookVisible();
  componentNav.validationNumberCartBadge(user.cart.initialCount);
  pageHome.clickAddToCartButton();
  pageHome.validateItemAddedMessage();
  componentNav.validationNumberCartBadge(user.cart.finalCount);
  componentNav.goToCart();
  pageCart.validateCartPage();
  pageCart.validateProductInCart();
  pageCart.validateTotal(user.cart.total);
  pageCart.clickCheckout();
  pageCheckout.validateCheckoutPage();
  pageCheckout.fillForm(user.checkout);
  pageCheckout.clickPlaceOrder();
  pageOrders.validateOrdersPage();
  pageOrders.validateOrderCreated(user.cart.total);
  pageOrders.openFirstOrder();
});

  it('Filtrar libros por categoria estan logueado | Rosa Sanchez', () => {
    cy.login(user.username, user.password);
    cy.url().should('include', url.home);
    pageHome.isBookVisible();
    pageHome.filterByCategory('Romance');
    pageHome.isAnyBookVisible();
  });

  it('Eliminar un libro de la wishlist estando logueado | Aldo Tula', () => {
    cy.login(user.username, user.password);
    cy.ensureWishlistHasItem(user.userId, user.username, user.password);
    cy.goToWishlist();
    cy.reload();
    pageWishlist.isWishlistNotEmpty();
    pageWishlist.removeFirstBook();
  });

  it('Titulo caso de prueba 4 | Nombre Alumno', () => {
  });

  it('Titulo caso de prueba 5 | Nombre Alumno', () => {
  });

});