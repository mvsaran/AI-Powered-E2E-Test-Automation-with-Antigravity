class CartPage {
    // Selectors
    get cartItems() {
        return cy.get('[class*="cart-item"], .cart-item, tr');
    }

    get checkoutButton() {
        return cy.contains('button', 'Proceed to Checkout');
    }

    get cartTotal() {
        return cy.get('[class*="total"], .total');
    }

    // Actions
    proceedToCheckout() {
        this.checkoutButton.should('be.visible').click();
    }

    // Verifications
    verifyCartPage() {
        cy.url().should('include', 'cart');
        this.checkoutButton.should('be.visible');
    }

    verifyCartHasItems() {
        this.cartItems.should('have.length.greaterThan', 0);
    }
}

export default CartPage;
