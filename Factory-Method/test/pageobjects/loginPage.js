import { BasePage } from './basePage.js';

/**
 * LoginPage containing specific selectors and methods related to login page
 */
export class LoginPage extends BasePage {
  /**
   * define selectors using getter methods and using '#' to make them private
   */
  get #loginOption() {
    return $('#login2');
  }
  get #usernameField() {
    return $('#loginusername');
  }
  get #passwordField() {
    return $('#loginpassword');
  }
  get #loginBtn() {
    return $('//button[text()="Log in"]');
  }
  get #loginForm() {
    return $('#logInModal .modal-dialog');
  }

  async inputUsername(username) {
    await this.#usernameField.waitForClickable({
      timeout: 2000,
      timeoutMsg: 'Waiting for username field to be clickable',
    });
    await this.#usernameField.setValue(username);
  }

  async getUsername() {
    return this.#usernameField.getValue();
  }

  async inputPassword(password) {
    await this.#passwordField.waitForClickable({
      timeout: 2000,
      timeoutMsg: 'Waiting for password field to be clickable',
    });
    await this.#passwordField.setValue(password);
  }

  async getPassword() {
    return this.#passwordField.getValue();
  }

  async login() {
    await this.#loginBtn.click();
    return this.#loginForm.waitForDisplayed({
      timeout: 3000,
      timeoutMsg: 'Waiting for login form to become invisible',
      reverse: true,
    });
  }

  /**
   * Invokes the open function of the parent class, passing the selector to open this page object.
   */
  open() {
    return super.open(this.#loginOption);
  }
}
