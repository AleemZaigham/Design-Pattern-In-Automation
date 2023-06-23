import { ProductPage } from "./productPage.js";

/**
 * PhonePage containing specific selectors and methods related to phone page
 */
export class PhonePage extends ProductPage {
  /**
   * Overrides the product category getter in parent class
   */
  get productCategory() {
    return $('//a[text()="Phones"]');
  }
}
