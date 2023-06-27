import { LoginPage } from '../pageobjects/loginPage.js';
import { HomePage } from '../pageobjects/homePage.js';
import { ProductPage } from '../pageobjects/productPage.js';
import { CartPage } from '../pageobjects/cartPage.js';
import { CheckoutPage } from '../pageobjects/checkoutPage.js';
import { ConfirmationPage } from '../pageobjects/confirmationPage.js';
import { expect } from 'chai';
import * as fs from 'fs';

const UserInfo = JSON.parse(fs.readFileSync('test/data/userInfo.json','utf-8'));
const loginPage = LoginPage.getInstance();
const homePage = HomePage.getInstance();
const productPage = ProductPage.getInstance();
const cartPage = CartPage.getInstance();
const checkoutPage = CheckoutPage.getInstance();
const confirmationPage = ConfirmationPage.getInstance();
let productPrice;
describe('Demo Blaze e2e flow', () => {
  it('should login with valid credentials successfully', async () => {
    await browser.url('/');
    await loginPage.open();
    await loginPage.inputUsername(UserInfo.username);
    await loginPage.inputPassword(UserInfo.password);
    expect(await loginPage.getUsername()).to.equal(UserInfo.username);
    expect(await loginPage.getPassword()).to.equal(UserInfo.password);
    const loginSuccess = await loginPage.login();
    return expect(loginSuccess).to.equal(true);
  });

  it('should select product and add to cart', async () => {
    await homePage.open();
    await homePage.getProduct(UserInfo.productName);
    await productPage.waitForReadiness();
    expect(await productPage.getName()).to.contain(UserInfo.productName);
    productPrice = await productPage.getPrice();
    await productPage.addToCart();
    return expect(await browser.getAlertText()).to.contain(UserInfo.success);
  });

  it('should open cart and verify product details', async () => {
    await browser.acceptAlert();
    await cartPage.open();
    await cartPage.waitForReadiness();
    expect(await cartPage.getName()).to.contain(UserInfo.productName);
    return expect(productPrice).to.contain(await cartPage.getPrice());
  });

  it('should place order and enter details', async () => {
    await cartPage.placeOrder();
    await checkoutPage.waitForReadiness();
    await checkoutPage.setName(UserInfo.username);
    await checkoutPage.setCard(UserInfo.creditCard);
    return Promise.all([
      expect(await checkoutPage.getName()).to.equal(UserInfo.username),
      expect(await checkoutPage.getCard()).to.equal(UserInfo.creditCard),
    ]);
  });

  it('should confirm purchase verify order details', async () => {
    await checkoutPage.completePurchase();
    await confirmationPage.waitForReadiness();
    const confirmationText = await confirmationPage.getConfirmationText();
    return Promise.all([
      expect(confirmationText).to.contain(UserInfo.username),
      expect(confirmationText).to.contain(UserInfo.creditCard),
    ]);
  });
});
