import { ProductFactory } from '../pageobjects/productFactory.js';
import { LoginPage } from "../pageobjects/loginPage.js";
import { HomePage } from "../pageobjects/homePage.js";
import { CartPage } from "../pageobjects/cartPage.js";
import { CheckoutPage } from "../pageobjects/checkoutPage.js";
import { ConfirmationPage } from "../pageobjects/confirmationPage.js";
import { ProductDetailsPage } from "../pageobjects/productDetailsPage.js";
import { expect } from 'chai';
import * as fs from 'fs';

const UserInfo = JSON.parse(fs.readFileSync('test/data/userInfo.json','utf-8'));
const ProductData = JSON.parse(fs.readFileSync('test/data/productsInfo.json','utf-8'));
const productFactory = new ProductFactory();
const loginPage = new LoginPage();
const homePage = new HomePage();
const productDetailsPage = new ProductDetailsPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const confirmationPage = new ConfirmationPage();
const flagValue = process.argv.find(arg => arg.includes('--productType='));
const productType = flagValue ? flagValue.split('=')[1] : null;
const productInfo = ProductData[productType];
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
    const productPage = await productFactory.getProductPage(productType);
    await productPage.getProduct(productInfo.name);
    await productDetailsPage.waitForReadiness();
    expect(await productDetailsPage.getName()).to.contain(productInfo.name);
    productPrice = await productDetailsPage.getPrice();
    await productDetailsPage.addToCart();
    return expect(await browser.getAlertText()).to.contain(UserInfo.success);
  });

  it('should open cart and verify product details', async () => {
    await browser.acceptAlert();
    await cartPage.open();
    await cartPage.waitForReadiness();
    let productDetails = await cartPage.getProductDetailsInCart(productInfo.name);
    expect(productDetails.productName).to.contain(productInfo.name);
    return expect(productPrice).to.contain(productDetails.productPrice);
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
