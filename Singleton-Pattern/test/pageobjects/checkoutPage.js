import { BasePage } from './basePage.js';

/**
 * CheckoutPage containing specific selectors and methods related to checkout page
 */
export class CheckoutPage extends BasePage {

  static instance = new CheckoutPage();
  constructor() {
    super();
    if(CheckoutPage.instance){
      throw new Error('CheckoutPage instance already exist. Use CheckoutPage.getInstance() to access it');
    }
  }
  static getInstance() {
    return CheckoutPage.instance;
  }

  /**
   * define selectors using getter methods and using '#' to make them private
   */
  get #detailsForm() {
    return $('#orderModal .modal-content');
  }
  get #userName() {
    return $('#name');
  }
  get #userCreditCard() {
    return $('#card');
  }
  get #purchaseBtn() {
    return $('//button[text()="Purchase"]');
  }

  async waitForReadiness() {
    return super.waitForReadiness(this.#detailsForm);
  }

  async setName(name) {
    return this.#userName.setValue(name);
  }

  async getName() {
    return this.#userName.getValue();
  }

  async setCard(card) {
    return this.#userCreditCard.setValue(card);
  }

  async getCard() {
    return this.#userCreditCard.getValue();
  }

  async completePurchase() {
    await this.#purchaseBtn.waitForClickable({
      timeout: 3000,
      timeoutMsg: 'Waiting for purchase button to be clickable',
    });
    await this.#purchaseBtn.click();
  }
}
