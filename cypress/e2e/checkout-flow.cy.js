import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderConfirmationPage from '../pages/OrderConfirmationPage';

describe('E2E Checkout Flow', () => {
    let testData;
    let loginPage;
    let productsPage;
    let cartPage;
    let checkoutPage;
    let orderConfirmationPage;

    before(() => {
        // Load test data
        cy.fixture('testData').then((data) => {
            testData = data;
        });
    });

    beforeEach(() => {
        // Initialize page objects
        loginPage = new LoginPage();
        productsPage = new ProductsPage();
        cartPage = new CartPage();
        checkoutPage = new CheckoutPage();
        orderConfirmationPage = new OrderConfirmationPage();
    });

    it('should complete the full checkout flow from login to order confirmation', () => {
        // Step 1: Navigate to login page
        cy.log('Step 1: Visiting login page');
        loginPage.visit();
        cy.wait(2000); // Wait for page to load
        loginPage.verifyLoginPage();

        // Step 2: Login with valid credentials
        cy.log('Step 2: Logging in');
        loginPage.login(testData.login.email, testData.login.password);
        cy.wait(3000); // Wait for navigation

        // Step 3: Verify products page is displayed
        cy.log('Step 3: Verifying products page');
        productsPage.verifyProductsPage();

        // Step 4: Add a product to cart
        cy.log('Step 4: Adding product to cart');
        productsPage.addProductToCart(0);
        productsPage.verifyProductAdded();

        // Step 5: Navigate to cart
        cy.log('Step 5: Navigating to cart');
        productsPage.goToCart();
        cy.wait(2000); // Wait for cart page to load

        // Step 6: Verify cart page and items
        cy.log('Step 6: Verifying cart');
        cartPage.verifyCartPage();
        cartPage.verifyCartHasItems();

        // Step 7: Proceed to checkout
        cy.log('Step 7: Proceeding to checkout');
        cartPage.proceedToCheckout();
        cy.wait(2000); // Wait for checkout page to load

        // Step 8: Verify checkout page
        cy.log('Step 8: Verifying checkout page');
        checkoutPage.verifyCheckoutPage();

        // Step 9: Fill checkout form
        cy.log('Step 9: Filling checkout form');
        checkoutPage.fillCheckoutForm(
            testData.checkout.name,
            testData.checkout.pincode,
            testData.checkout.address,
            testData.checkout.city,
            testData.checkout.paymentMethod
        );

        // Step 10: Place order
        cy.log('Step 10: Placing order');
        checkoutPage.placeOrder();
        cy.wait(3000); // Wait for order processing

        // Step 11: Verify order confirmation
        cy.log('Step 11: Verifying order confirmation');
        orderConfirmationPage.verifyOrderConfirmation();
        orderConfirmationPage.verifyOrderIdExists();

        // Step 12: Log order ID
        orderConfirmationPage.getOrderId().then((orderId) => {
            cy.log(`Order placed successfully with ID: ${orderId}`);
        });
    });

    after(() => {
        // Close browser after test completion
        cy.log('Test completed - closing browser');
    });
});
