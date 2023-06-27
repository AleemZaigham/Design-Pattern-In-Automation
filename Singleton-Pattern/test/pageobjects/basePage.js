/**
 * Base page object containing all methods
 * that is shared across page objects
 */
export class BasePage {
  /**
   * Based on the element provided, it opens a different page.
   * @param element
   */
  async open(element) {
    await element.waitForClickable({
      timeout: 3000,
      timeoutMsg: `Waiting for ${await element.getTagName()} to be clickable`,
    });
    await element.click();
  }

  /**
   * Wait for the sub-pages to be displayed on the basis of provided element.
   * @param element
   */
  async waitForReadiness(element) {
    return element.waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `Waiting for ${await element.getTagName()} to be displayed`,
    });
  }
}
