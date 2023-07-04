import { LoginPage } from './loginPage.js';
import { HomePage } from './homePage.js';
import { ProductPage } from './productPage.js';
import { CartPage } from './cartPage.js';
import { CheckoutPage } from './checkoutPage.js';
import { ConfirmationPage } from './confirmationPage.js';
import { expect } from 'chai';

/**
 * Facade containing all complex user actions and combine them to make complete flow
 */
export class Facade {

   #loginPage = new LoginPage();
   #homePage = new HomePage();
   #productPage = new ProductPage();
   #cartPage = new CartPage();
   #checkoutPage = new CheckoutPage();
   #confirmationPage = new ConfirmationPage();

  async login(username, password) {
    await this.#loginPage.open();
    await this.#loginPage.inputUsername(username);
    await this.#loginPage.inputPassword(password);
    expect(await this.#loginPage.getUsername()).to.equal(username);
    expect(await this.#loginPage.getPassword()).to.equal(password);
    return this.#loginPage.login();
  }

  async addProductToCart(productName) {
    await this.#homePage.open();
    await this.#homePage.getProduct(productName);
    await this.#productPage.waitForReadiness();
    expect(await this.#productPage.getName()).to.contain(productName);
    const productPrice = await this.#productPage.getPrice();
    await this.#productPage.addToCart();
    return productPrice;
  }

  async verifyProductInCart(productName) {
    await browser.acceptAlert();
    await this.#cartPage.open();
    await this.#cartPage.waitForReadiness();
    let productDetails = await this.#cartPage.getProductDetailsInCart(productName);
    expect(productDetails.productName).to.contain(productName);
    return productDetails.productPrice;
  }

  async placeOrder(username, creditCard) {
    await this.#cartPage.placeOrder();
    await this.#checkoutPage.waitForReadiness();
    await this.#checkoutPage.setName(username);
    await this.#checkoutPage.setCard(creditCard);
    return [(await this.#checkoutPage.getName()),(await this.#checkoutPage.getCard())];
  }

  async verifyOrderDetails() {
    await this.#checkoutPage.completePurchase();
    await this.#confirmationPage.waitForReadiness();
    return this.#confirmationPage.getConfirmationText();
  }
}
