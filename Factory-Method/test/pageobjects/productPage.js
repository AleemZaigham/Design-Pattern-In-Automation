/**
 * Product page object containing all methods
 * that is shared across all product pages
 */
export class ProductPage {

  get productCategory() {
      return new Error("Should be implemented in child class");
  }
  get #allProducts() {
      return $$('.card-title');
  }
  get #productDisplay() {
      return $('#tbodyid');
  }

/**
 * Based on product name provided, it opens a different product results page
 * and then opens a different product details page.
 * @param productName
*/
 async getProduct(productName){
    await this.productCategory.waitForClickable({
      timeout: 3000,
      timeoutMsg: `Waiting for ${await this.productCategory.getTagName()} to be clickable`,
    });
    await this.productCategory.click();
     await this.#productDisplay.waitForDisplayed({
         timeout: 5000,
         timeoutMsg: 'Waiting for products to be displayed',
     });
     await browser.pause(2000);
     const requiredProduct = await this.#allProducts.find(
         async (product) => (await product.getText()) === productName
     );
     await requiredProduct.click();
 }
}
