import { BasePage } from './basePage.js';

/**
 * ProductDetailsPage containing specific selectors and methods related to product details page
 */
export class ProductDetailsPage extends BasePage {
  /**
   * define selectors using getter methods and using '#' to make them private
   */
  get #productDetails() {
    return $('#tbodyid');
  }
  get #productName() {
    return this.#productDetails.$('.name');
  }
  get #productPrice() {
    return this.#productDetails.$('.price-container');
  }
  get #addToCartBtn() {
    return $('//a[text()="Add to cart"]');
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

  async addToCart() {
    await this.#addToCartBtn.waitForClickable({
      timeout: 3000,
      timeoutMsg: 'Waiting for add to cart button to be clickable',
    });
    await this.#addToCartBtn.click();
    return browser.waitUntil(async () => {
      return browser.isAlertOpen();
    });
  }
}
