import { BasePage } from './basePage.js';

/**
 * HomePage containing specific selectors and methods related to home page
 */
export class HomePage extends BasePage {
  /**
   * define selectors using getter methods and using '#' to make them private
   */
  get #homeOption() {
    return $('//a[text()="Home "]');
  }

  /**
   * Invokes the open function of the parent class, passing the selector to open this page object.
   */
  async open() {
    return super.open(this.#homeOption);
  }
}
