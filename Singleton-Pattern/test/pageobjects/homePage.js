import { BasePage } from './basePage.js';

/**
 * HomePage containing specific selectors and methods related to home page
 */
export class HomePage extends BasePage {

  static instance = new HomePage();
  constructor() {
    super();
    if(HomePage.instance){
      throw new Error('HomePage instance already exist. Use HomePage.getInstance() to access it');
    }
  }
  static getInstance() {
    return HomePage.instance;
  }

  /**
   * define selectors using getter methods and using '#' to make them private
   */
  get #homeOption() {
    return $('//a[text()="Home "]');
  }
  get #allProducts() {
    return $$('.card-title');
  }
  get #productDisplay() {
    return $('#tbodyid');
  }

  async getProduct(name) {
    await this.#productDisplay.waitForClickable({
      timeout: 5000,
      timeoutMsg: 'Waiting for products to be clickable',
    });
    const requiredProduct = await this.#allProducts.find(
      async (product) => (await product.getText()) === name
    );
    await requiredProduct.click();
  }

  /**
   * Invokes the open function of the parent class, passing the selector to open this page object.
   */
  async open() {
    return super.open(this.#homeOption);
  }
}
