import { BasePage } from './basePage.js';

/**
 * CartPage containing specific selectors and methods related to cart page
 */
export class CartPage extends BasePage {
  /**
   * define selectors using getter methods and using '#' to make them private
   */
  get #cartOption() {
    return $('//a[text()="Cart"]');
  }
  get #productDetails() {
    return $('#tbodyid');
  }
  get #productName() {
    return this.#productDetails.$('td:nth-child(2)');
  }
  get #productPrice() {
    return this.#productDetails.$('td:nth-child(3)');
  }
  get #placeOrderBtn() {
    return $('[data-target*="order"]');
  }

  async waitForReadiness() {
    return super.waitForReadiness(this.#productDetails);
  }

  async getName() {
    return this.#productName.getText();
  }

  async getPrice() {
    return this.#productPrice.getText();
  }

  async placeOrder() {
    await this.#placeOrderBtn.waitForClickable({
      timeout: 3000,
      timeoutMsg: 'Waiting for place order button to be clickable',
    });
    await this.#placeOrderBtn.click();
  }

  /**
   * Invokes the open function of the parent class, passing the selector to open this page object.
   */
  async open() {
    return super.open(this.#cartOption);
  }
}
