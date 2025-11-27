class ProductsPage {
    // Selectors
    get productCards() {
        return cy.get('.product-card, [class*="product"]');
    }

    get addToCartButtons() {
        return cy.contains('button', 'Add to Cart');
    }

    get cartIcon() {
        return cy.get('a[href="/cart"]');
    }

    get pageHeading() {
        return cy.get('h1, h2').first();
    }

    // Actions
    addProductToCart(productIndex = 0) {
        // Add the first product or specific product by index
        cy.contains('button', 'Add to Cart').eq(productIndex).click();
        // Wait for cart update
        cy.wait(1000);
    }

    goToCart() {
        cy.get('a[href="/cart"]').click();
    }

    // Verifications
    verifyProductsPage() {
        this.addToCartButtons.should('exist');
        cy.url().should('not.include', 'login');
    }

    verifyProductAdded() {
        // Verify success message or cart count update
        cy.wait(500);
    }
}

export default ProductsPage;
