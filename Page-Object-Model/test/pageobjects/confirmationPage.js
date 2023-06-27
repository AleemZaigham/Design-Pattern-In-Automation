import { BasePage } from './basePage.js';

/**
 * ConfirmationPage containing specific selectors and methods for a confirmation page
 */
export class ConfirmationPage extends BasePage {
  /**
   * define selectors using getter methods and using '#' to make them private
   */
  get #confirmationAlert() {
    return $('.showSweetAlert');
  }
  get #confirmationText() {
    return $('.lead');
  }
  get #confirmBtn() {
    return $('[class*="confirm-button"]');
  }

  async waitForReadiness() {
    return super.waitForReadiness(this.#confirmationAlert);
  }

  async getConfirmationText() {
    return this.#confirmationText.getText();
  }

  async confirmPurchase() {
    await this.#confirmBtn.waitForClickable({
      timeout: 3000,
      timeoutMsg: 'Waiting for OK button in confirmation form to be clickable',
    });
    await this.#confirmBtn.click();
  }
}
