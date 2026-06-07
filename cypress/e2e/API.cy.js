import user from '../fixtures/user.json'

describe('Casos de prueba de APIs', () => {


    it('API | Comprar carrito exitosamente', () => {
        cy.loginAPI(user.username, user.password).then((token) => {
            cy.postCheckOutAPI(user.userId, token, 200)
        })
    })

    it('API | Error al comprar carrito sin token', () => {
        cy.postCheckOutAPI(user.userId, '', 401)
    })

    it('API Obtener listado de categoria de libros | Rosa Sanchez', () => {
        cy.getCategoriesAPI(200)
    })

    it('API Error al obtener listado de categorías utilizando método HTTP incorrecto | Rosa Sanchez', () => {
        cy.postCategoriesAPI(405)
    })

    it('API Obtener wishlist de un usuario válido | Aldo Tula', () => {
        cy.getWishlistAPI(user.userId, 200)
    })

    it('Error al obtener wishlist de un usuario inexistente | Aldo Tula', () => {
        cy.getWishlistAPI(99999, 200)
    })
    // Nota: La API devuelve 200 OK con lista vacía para usuarios inexistentes, en lugar de 404 Not Found.

    it('API | Inicio de sesión exitoso | Leonel Quisbert', () => {
        cy.loginAPI(user.username, user.password, 200)
    })

    it('API | Error al iniciar sesión con credenciales inválidas | Leonel Quisbert', () => {
        cy.loginAPI(user.username, 'PasswordIncorrecta', 401)
    })
    

})
