import user from '../fixtures/user.json'

describe('Casos de prueba de APIs', () => {


    it.skip('API | Comprar carrito exitosamente', () => {
        cy.loginAPI(user.username, user.password).then((token) => {
            cy.postCheckOutAPI(user.userId, token, 200)
        })
    })

    it.skip('API | Error al comprar carrito sin token', () => {
        cy.postCheckOutAPI(user.userId, '', 401)
    })

    it.skip('API | Obtener listado de categoria de libros | Rosa Sanchez', () => {
        cy.getCategoriesAPI(200)
    })

    it('API | Obtener listado de categorias de libros | Correccion |Rosa Sanchez', () => {
        cy.categoriesAPI(200)
    })

    it('API | Validar contenido de categoria de libros | Correccion |Rosa Sanchez', () => {
        cy.categoriesAPI(200)
    })


    it.skip('API | Error al obtener listado de categorías utilizando método HTTP incorrecto | Rosa Sanchez', () => {
        cy.postCategoriesAPI(405)
    })

    it.skip('API | Obtener wishlist de un usuario válido | Aldo Tula', () => {
        cy.getWishlistAPI(user.userId, 200)
    })

    it.skip('API Error al obtener wishlist de un usuario inexistente | Aldo Tula', () => {
        cy.getWishlistAPI(99999, 200)
    })
    
    it.skip('API | Inicio de sesión exitoso | Leonel Quisbert', () => {
        cy.loginAPI(user.username, user.password, 200)
    })

    it.skip('API | Error al iniciar sesión con credenciales inválidas | Leonel Quisbert', () => {
        cy.loginAPI(user.username, 'PasswordIncorrecta', 401)
    })
    

     it.skip('API: Registro de usuario exitoso | Vitalia Miranda', () => {
        cy.registerUserAPI(200)
    })

    it.skip('API | Intentar registrar datos incompletos | Vitalia Miranda', () => {
        cy.registrarDatosIncompletosAPI(400)
    })

})
