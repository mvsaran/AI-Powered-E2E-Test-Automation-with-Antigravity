describe('Simple Login Test', () => {
    it('should load the login page and login successfully', () => {
        // Visit the application
        cy.visit('http://localhost:3000');

        // Wait for page to load
        cy.wait(2000);

        // Verify we're on the login page
        cy.get('#email').should('be.visible');
        cy.get('#password').should('be.visible');

        // Enter credentials
        cy.get('#email').type('john@example.com');
        cy.get('#password').type('password123');

        // Click sign in
        cy.get('button.btn-primary').click();

        // Wait for navigation
        cy.wait(3000);

        // Verify we're on products page
        cy.url().should('not.include', 'login');
        cy.contains('button', 'Add to Cart').should('exist');

        // Add product to cart
        cy.contains('button', 'Add to Cart').first().click();
        cy.wait(2000);

        // Go to cart
        cy.get('a[href="/cart"]').click();
        cy.wait(2000);

        // Verify cart page
        cy.url().should('include', 'cart');
        cy.contains('button', 'Proceed to Checkout').should('be.visible');

        // Proceed to checkout
        cy.contains('button', 'Proceed to Checkout').click();
        cy.wait(2000);

        // Verify checkout page
        cy.url().should('include', 'checkout');

        // Fill form
        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="pincode"]').type('12345');
        cy.get('input[name="address"]').type('123 Test Street');
        cy.get('input[name="city"]').type('Test City');
        cy.get('select[name="paymentMethod"]').select('cod');

        // Place order
        cy.contains('button', 'Place Order').click();
        cy.wait(3000);

        // Verify confirmation
        cy.url().should('include', 'order-confirmation');
        cy.contains(/order.*confirmed|thank you|success/i).should('be.visible');
    });
});
