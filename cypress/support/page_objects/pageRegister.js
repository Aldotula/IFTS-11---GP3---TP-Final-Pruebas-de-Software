class pageRegister {
  get firstNameInput() { return cy.get('input.mat-mdc-input-element').eq(0); }
  get lastNameInput() { return cy.get('input.mat-mdc-input-element').eq(1); }
  get userNameInput() { return cy.get('input.mat-mdc-input-element').eq(2); }
  get passwordInput() { return cy.get('input.mat-mdc-input-element').eq(3); }
  get confirmPasswordInput() { return cy.get('input.mat-mdc-input-element').eq(4); }
  get genderMaleRadio() { return cy.get('input[type="radio"][value="Male"]'); } 
  get genderFemaleRadio() { return cy.get('input[type="radio"][value="Female"]'); }
  get submitButton() { return cy.get('button').contains('Register'); }

  visitar() {
    cy.visit('https://app.bookdbqa.online/register');
  }

  completarFormulario(usuario) {
    if (usuario.firstName) this.firstNameInput.type(usuario.firstName);
    if (usuario.lastName) this.lastNameInput.type(usuario.lastName);
    if (usuario.userName) this.userNameInput.type(usuario.userName);
    if (usuario.password) this.passwordInput.type(usuario.password);
    if (usuario.confirmPassword) this.confirmPasswordInput.type(usuario.confirmPassword);
    
    if (usuario.gender) {
      if (usuario.gender === 'Female') this.genderFemaleRadio.check({ force: true });
      if (usuario.gender === 'Male') this.genderMaleRadio.check({ force: true });
    }
  }

  enviarFormulario() {
    this.submitButton.click();
  }
}

export default new pageRegister();