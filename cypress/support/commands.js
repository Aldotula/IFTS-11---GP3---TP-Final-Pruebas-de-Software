const pageLogin = require('../support/page_objects/pageLogin')

Cypress.Commands.add('login', (name, password) => {
    pageLogin.typeUserName(name);
    pageLogin.typeUserPassword(password);
    pageLogin.clickLoginButton();
})

Cypress.Commands.add('deleteCartAPI', (userId) => {
    cy.request({
        method: 'DELETE',
        url: `https://app.bookdbqa.online/api/shoppingcart/${userId}`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: ''
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('postCheckOutAPI', (userId, token, codeResponse) => {
    cy.request({
        method: 'POST',
        url: `https://app.bookdbqa.online/api/CheckOut/${userId}`,
        failOnStatusCode: false,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: token,
        },
        body: {
            orderDetails: [
                {
                    book: {
                        bookId: 3,
                        title: "Harry Potter and the Prisoner of Azkaban",
                        author: "JKR",
                        category: "Romance",
                        price: 213,
                        coverFileName: "test.jpg"
                    },
                    quantity: 1
                }
            ],
            cartTotal: 213
        }
    }).then((response) => {
        expect(response.status).to.eq(codeResponse)
    })
})

Cypress.Commands.add('getCategoriesAPI', (codeResponse) => {
    cy.request({
        method: 'GET',
        url: 'https://app.bookdbqa.online/api/Book/GetCategoriesList',
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(codeResponse)
    })
})


Cypress.Commands.add('postCategoriesAPI', (codeResponse) => {
    cy.request({
        method: 'POST',
        url: 'https://app.bookdbqa.online/api/Book/GetCategoriesList',
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(codeResponse)
    })
})

Cypress.Commands.add('getWishlistAPI', (userId, codeResponse) => {
    cy.request({
        method: 'GET',
        url: `https://app.bookdbqa.online/api/Wishlist/${userId}`,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(codeResponse)
    })
})

Cypress.Commands.add('filterByCategory', (categoryName) => {
    cy.contains(categoryName).click()
})

Cypress.Commands.add('goToWishlist', () => {
    cy.visit('https://app.bookdbqa.online/wishlist')
})

Cypress.Commands.add('toggleWishlistAPI', (userId, bookId, token) => {
    cy.request({
        method: 'POST',
        url: `https://app.bookdbqa.online/api/Wishlist/ToggleWishlist/${userId}/${bookId}`,
        failOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
})