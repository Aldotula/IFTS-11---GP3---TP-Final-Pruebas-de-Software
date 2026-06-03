import user from '../fixtures/user.json'
import url from '../fixtures/url.json'
const pageHome = require('../support/page_objects/pageHome')
const componentNav = require('../support/page_objects/componentNav')
const pageWishlist = require('../support/page_objects/pageWishlist')


describe('Casos de prueba de FRONT', () => {

  it('Comprar carrito exitosamente y visualizar orden de compra', () => {

    cy.deleteCartAPI(user.userId);
    cy.visit(url.login)
    cy.login(user.name, user.password);
    cy.url().should('include', url.home)
    pageHome.isBookVisible();
    componentNav.validationNumberCartBadge('0')
    pageHome.clickAddToCartButton();
    cy.contains('One Item added to cart').should('be.visible')
    componentNav.validationNumberCartBadge('1')
    cy.get('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed').contains('shopping_cart').click()


  })

it('Filtrar libros por categoria estan logueado | Rosa Sanchez', () => {

    cy.visit(url.login)
    cy.login(user.name, user.password)
    cy.url().should('include', url.home)
    pageHome.isBookVisible()
    cy.filterByCategory('Romance')
    pageHome.isAnyBookVisible()
})


it.only('Eliminar un libro de la wishlist estando logueado | Aldo Tula', () => {

    cy.toggleWishlistAPI(user.userId, 2, user.token)
    cy.visit(url.login)
    cy.login(user.name, user.password)
    cy.url().should('include', url.home)
    cy.goToWishlist()
    cy.reload()
    pageWishlist.isWishlistNotEmpty()
    pageWishlist.removeFirstBook()
})

it('Titulo caso de prueba 4 | Nombre Alumno', () => {
})

it('Titulo caso de prueba 5 | Nombre Alumno', () => {
})

  //it.only ejecutar solo ese caso de prueba
  //it.skip no ejecuta ese caso de prueba
  
})