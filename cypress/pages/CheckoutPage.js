class CheckoutPage {
    // Selectors
    get nameInput() {
        return cy.get('input[name="name"], input[placeholder*="name" i], input[id*="name"]');
    }

    get pincodeInput() {
        return cy.get('input[name="pincode"], input[placeholder*="pincode" i], input[id*="pincode"], input[name="zip"]');
    }

    get addressInput() {
        return cy.get('input[name="address"], textarea[name="address"], input[placeholder*="address" i], input[id*="address"]');
    }

    get cityInput() {
        return cy.get('input[name="city"], input[placeholder*="city" i], input[id*="city"]');
    }

    get paymentMethodSelect() {
        return cy.get('select[name="paymentMethod"], select[name="payment"]');
    }

    get placeOrderButton() {
        return cy.contains('button', 'Place Order');
    }

    // Actions
    fillCheckoutForm(name, pincode, address, city, paymentMethod = 'cod') {
        this.nameInput.clear().type(name);
        this.pincodeInput.clear().type(pincode);
        this.addressInput.clear().type(address);
        this.cityInput.clear().type(city);
        this.paymentMethodSelect.select(paymentMethod);
    }

    placeOrder() {
        this.placeOrderButton.should('be.visible').click();
    }

    // Verifications
    verifyCheckoutPage() {
        cy.url().should('include', 'checkout');
        this.nameInput.should('be.visible');
        this.placeOrderButton.should('be.visible');
    }
}

export default CheckoutPage;
