class OrderConfirmationPage {
    // Selectors
    get successMessage() {
        return cy.contains(/order.*confirmed|thank you|success/i);
    }

    get orderId() {
        return cy.get('[class*="order-id"], #order-id, [data-testid="order-id"]');
    }

    // Actions
    getOrderId() {
        return this.orderId.invoke('text');
    }

    // Verifications
    verifyOrderConfirmation() {
        cy.url().should('include', 'order-confirmation');
        this.successMessage.should('be.visible');
    }

    verifyOrderIdExists() {
        this.orderId.should('exist').and('not.be.empty');
    }
}

export default OrderConfirmationPage;
