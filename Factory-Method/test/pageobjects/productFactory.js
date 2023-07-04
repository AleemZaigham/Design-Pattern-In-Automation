import { PhonePage } from "./phonePage.js";
import { LaptopPage } from "./laptopPage.js";
import { MonitorPage } from "./monitorPage.js";

/**
 * Product Factory to manage and get product depends on their type and name.
 * The purpose of this is to centralize the creation and management of different Product pages,
 * making it easier to access and use them according to passed arguments in test scripts.
 */
export class ProductFactory {
  constructor(product) {
    this.product = product;
  }

  getProductPage(productType) {
    switch (productType) {
      case 'phone':
        return new PhonePage();
      case 'laptop':
        return new LaptopPage();
      case 'monitor':
        return new MonitorPage();
      default:
        throw new Error('Invalid product not available');
    }
  }
}
