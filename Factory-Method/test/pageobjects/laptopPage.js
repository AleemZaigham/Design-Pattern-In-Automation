import { ProductPage } from "./productPage.js";

/**
 * LaptopPage containing specific selectors and methods related to laptop page
 */
export class LaptopPage extends ProductPage {
  /**
   * Overrides the product category getter in parent class
   */
  get productCategory() {
    return $('//a[text()="Laptops"]');
  }
}
