import { expect } from 'chai';
import * as fs from 'fs';
import {Facade} from '../pageobjects/facade.js';

const UserInfo = JSON.parse(fs.readFileSync('test/data/userInfo.json','utf-8'));
const facade = new Facade();
let productPrice;
describe('Demo Blaze e2e flow', () => {
  it('should login with valid credentials successfully', async () => {
    await browser.url('/');
    const loginSuccess = await facade.login(UserInfo.username, UserInfo.password);
    return expect(loginSuccess).to.equal(true);
  });

  it('should select product and add to cart', async () => {
    productPrice = await facade.addProductToCart(UserInfo.productName);
    return expect(await browser.getAlertText()).to.contain(UserInfo.success);
  });

  it('should open cart and verify product details', async () => {
    const priceFromCart = await facade.verifyProductInCart(UserInfo.productName);
    return expect(productPrice).to.contain(priceFromCart);
  });

  it('should place order and enter details', async () => {
    const [userName, creditCard] = await facade.placeOrder(UserInfo.username, UserInfo.creditCard);
    return Promise.all([
      expect(userName).to.equal(UserInfo.username),
      expect(creditCard).to.equal(UserInfo.creditCard)
    ]);
  });

  it('should confirm purchase verify order details', async () => {
    const confirmationText = await facade.verifyOrderDetails();
    return Promise.all([
      expect(confirmationText).to.contain(UserInfo.username),
      expect(confirmationText).to.contain(UserInfo.creditCard),
    ]);
  });
});
