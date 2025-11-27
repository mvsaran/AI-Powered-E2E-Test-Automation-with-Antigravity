class LoginPage {
    // Selectors
    get emailInput() {
        return cy.get('#email');
    }

    get passwordInput() {
        return cy.get('#password');
    }

    get signInButton() {
        return cy.get('button.btn-primary');
    }

    get loginForm() {
        return cy.get('form');
    }

    // Actions
    visit() {
        cy.visit('/');
    }

    login(email, password) {
        this.emailInput.clear().type(email);
        this.passwordInput.clear().type(password);
        this.signInButton.click();
    }

    // Verifications
    verifyLoginPage() {
        this.loginForm.should('be.visible');
        this.emailInput.should('be.visible');
        this.passwordInput.should('be.visible');
        this.signInButton.should('be.visible');
    }
}

export default LoginPage;
