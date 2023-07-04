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
  get #placeOrderBtn() {
    return $('[data-target*="order"]');
  }

  async waitForReadiness() {
    return super.waitForReadiness(this.#productDetails);
  }


  async placeOrder() {
    await this.#placeOrderBtn.waitForClickable({
      timeout: 3000,
      timeoutMsg: 'Waiting for place order button to be clickable',
    });
    await this.#placeOrderBtn.click();
  }

  async getProductDetailsInCart(product) {
    let productNameSelector = await this.#productDetails.$(`//td[text()="${product}"]`);
    let productPriceSelector = await this.#productDetails.$(`//td[text()="${product}"]/following-sibling::td`);
    await productNameSelector.waitForDisplayed({
      timeout: 3000,
      timeoutMsg: 'Waiting for product name to be displayed'
    });
    let productName = await productNameSelector.getText();
    await productPriceSelector.waitForDisplayed({
      timeout: 3000,
      timeoutMsg: 'Waiting for product price to be displayed'
    });
    let productPrice = await productPriceSelector.getText();
    return { productName, productPrice }
  }

  /**
   * Invokes the open function of the parent class, passing the selector to open this page object.
   */
  async open() {
    return super.open(this.#cartOption);
  }
}
