import pageLogin from '../support/page_objects/pageLogin';
import url from '../fixtures/url.json';

Cypress.Commands.add('login', (name, password) => {
  cy.visit(url.login);

  pageLogin.typeUserName(name);
  pageLogin.typeUserPassword(password);
  pageLogin.clickLoginButton();

  cy.url().should('not.include', 'login');
});

Cypress.Commands.add('deleteCartAPI', (userId) => {
  return cy.request({
    method: 'DELETE',
    url: `https://app.bookdbqa.online/api/shoppingcart/${userId}`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add('postCheckOutAPI', (userId, token, codeResponse) => {

  const orderData = {
    orderDetails: [
      {
        book: {
          bookId: 2,
          title: "Harry Potter and the Chamber of Secrets",
          author: "JKR",
          category: "Fantasy",
          price: 236,
          coverFileName: "test.jpg"
        },
        quantity: 1
      }
    ],
    cartTotal: 236
  };

  return cy.request({
    method: 'POST',
    url: `https://app.bookdbqa.online/api/CheckOut/${userId}`,
    failOnStatusCode: false,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: token ? `Bearer ${token}` : ''
    },
    body: orderData
  }).then((response) => {
    expect(response.status).to.eq(codeResponse);
  });
});

Cypress.Commands.add('getCategoriesAPI', (codeResponse) => {
  return cy.request({
    method: 'GET',
    url: 'https://app.bookdbqa.online/api/Book/GetCategoriesList',
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(codeResponse);
  });
});

Cypress.Commands.add('postCategoriesAPI', (codeResponse) => {
  return cy.request({
    method: 'POST',
    url: 'https://app.bookdbqa.online/api/Book/GetCategoriesList',
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(codeResponse);
  });
});

Cypress.Commands.add('getWishlistAPI', (userId, codeResponse) => {
  return cy.request({
    method: 'GET',
    url: `https://app.bookdbqa.online/api/Wishlist/${userId}`,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(codeResponse);
  });
});

Cypress.Commands.add('toggleWishlistAPI', (userId, bookId, token) => {
  return cy.request({
    method: 'POST',
    url: `https://app.bookdbqa.online/api/Wishlist/ToggleWishlist/${userId}/${bookId}`,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
});

Cypress.Commands.add('goToWishlist', () => {
  cy.visit(url.wishlist);
});

Cypress.Commands.add('filterByCategory', (categoryName) => {
  cy.contains(categoryName)
    .should('be.visible')
    .click();
});

Cypress.Commands.add('loginAPI', (username, password) => {
  return cy.request({
    method: 'POST',
    url: 'https://app.bookdbqa.online/api/Login',
    body: {
      userName: username,
      password: password
    }
  }).then((response) => {
    return response.body.token;
  });
});

Cypress.Commands.add('ensureWishlistHasItem', (userId, username, password) => {
  cy.loginAPI(username, password).then((token) => {
    cy.request({
      method: 'GET',
      url: `https://app.bookdbqa.online/api/Wishlist/${userId}`
    }).then((response) => {
      if (response.body.length === 0) {
        cy.toggleWishlistAPI(userId, 2, token);
      }
    });
  });
});

Cypress.Commands.add('loginAPI', (username, password, codeResponse) => {
  return cy.request({
    method: 'POST',
    url: 'https://app.bookdbqa.online/api/Login',
    failOnStatusCode: false,
    body: {
      userName: username,
      password: password
    }
  }).then((response) => {
    expect(response.status).to.eq(codeResponse);
  });
});

Cypress.Commands.add('registerUserAPI', (codeResponse) => {
  const body = {
      confirmPassword: "Vitalia1234",
      firstName: "vitalia",
      gender: "Female",
      lastName: "miranda",
      password: "Vitalia1234",
      userName: "vitaliamiranda"
  };

  return cy.request({
    method: 'POST',
    url: 'https://app.bookdbqa.online/api/user/',
    failOnStatusCode: false, 
    body: body
  }).then((response) => {
    expect(response.status).to.be.oneOf([200, 201]);
  })
});

Cypress.Commands.add('registrarDatosIncompletosAPI', (codeResponse) => {
  const body = {
      lastName: "miranda",
      password: "Vitalia1234",
      userName: "vitaliamiranda"
  };

  return cy.request({
    method: 'POST',
    url: 'https://app.bookdbqa.online/api/user/',
    failOnStatusCode: false, 
    body: body
  }).then((response) => {
    expect(response.status).to.eq(codeResponse);
  })
});
