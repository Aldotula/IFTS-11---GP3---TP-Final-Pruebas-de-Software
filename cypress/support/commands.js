import pageLogin from '../support/page_objects/pageLogin';
import url from '../fixtures/url.json';

Cypress.Commands.add('login', (name, password) => {
  cy.visit(url.login);

  pageLogin.typeUserName(name);
  pageLogin.typeUserPassword(password);
  pageLogin.clickLoginButton();

  cy.url().should('not.include', 'login');
});

Cypress.Commands.add('filterByCategory', (categoryName) => {
  cy.contains(categoryName)
    .should('be.visible')
    .click();
});

Cypress.Commands.add('clearCategoryFilter', () => {
  cy.contains('All Categories')
    .should('be.visible')
    .click();
});

Cypress.Commands.add('saveBooksList', () => {
  cy.get('.book-card').then((books) => {
    const listBefore = [...books].map(book => book.innerText.trim());
    cy.wrap(listBefore).as('booksBefore');
  });
});

Cypress.Commands.add('verifyBooksListChanged', () => {
  cy.get('@booksBefore').then((beforeList) => {
    cy.get('.book-card').then((booksAfter) => {
      const afterList = [...booksAfter].map(book => book.innerText.trim());
      expect(afterList).to.not.deep.equal(beforeList);
    });
  });
});

Cypress.Commands.add('verifyBooksAfterFilterRemoved', () => {
  cy.get('.book-card')
    .should('have.length.greaterThan', 0);
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

Cypress.Commands.add('categoriesAPI', (expectedStatus) => {
  cy.request({
    method: 'GET',
    url: 'https://app.bookdbqa.online/api/Book/GetCategoriesList'
  }).then((response) => {
    expect(response.status).to.eq(expectedStatus);

    const categories = response.body.map(cat => cat.categoryName);
    expect(categories).to.include('Romance');
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

Cypress.Commands.add('loginAPI', (username, password, codeResponse = 200) => {
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

    if (response.status === 200 && response.body) {
      return response.body.token;
    }

    return null;
  });
});

Cypress.Commands.add('registerUserAPI', (codeResponse) => {
  const randomUser = `user${Date.now()}`;

  return cy.request({
    method: 'POST',
    url: 'https://app.bookdbqa.online/api/User',
    failOnStatusCode: false,
    body: {
      firstName: 'Test',
      lastName: 'User',
      userName: randomUser,
      password: 'Test1234',
      confirmPassword: 'Test1234',
      gender: 'Male'
    }
  }).then((response) => {
    expect(response.status).to.eq(codeResponse);
  });
});

Cypress.Commands.add('registrarDatosIncompletosAPI', (codeResponse) => {
  return cy.request({
    method: 'POST',
    url: 'https://app.bookdbqa.online/api/User',
    failOnStatusCode: false,
    body: {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      confirmPassword: '',
      gender: ''
    }
  }).then((response) => {
    expect(response.status).to.eq(codeResponse);
  });
});