import { ProductPage } from "./productPage.js";

/**
 * MonitorPage containing specific selectors and methods related to monitor page
 */
export class MonitorPage extends ProductPage {
  /**
   * Overrides the product category getter in parent class
   */
  get productCategory() {
    return $('//a[text()="Monitors"]');
  }
}