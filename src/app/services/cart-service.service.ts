import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor() { }

  //****************************Logic******************************** */
  calculateCartTotalPrice(cartProductList: any[], list?: any[]) {
    let totalPrice = 0;
    let productList = [];

    if (list != null) {
      productList = list
    } else {
      productList = cartProductList;
    }

    productList.forEach((item) => {
      totalPrice += item.totalCostForItem;
    })

    return totalPrice;

  }

  reCalcTotalPrice(cartProductList: any[], newCount: any, targetProduct: any) {
    let totalPrice = 0;
    let newPrice = 0;
    cartProductList.forEach((pro, i) => {
      if (pro.item.id == targetProduct.id) {

        if (newCount == 0) {
          cartProductList.splice(i, 1);
          alert("Removed from Cart ")
        } else {
          //modify count number and total cost for Item

          pro.count = newCount;
          pro.totalCostForItem = newCount * pro.item.price;
        }
      }
      newPrice = this.calculateCartTotalPrice(cartProductList);
    })

    return newPrice;

  }

  deletProduct(cartProductList: any[], id: any) {

    let newPrice=0;
    cartProductList.forEach((pro, i) => {
      if (pro.item.id == id) {
        cartProductList.splice(i, 1);
        alert("Removed from Cart ");
      }
    }
    )
    newPrice = this.calculateCartTotalPrice(cartProductList);

return {newList:cartProductList,price:newPrice};
  }
}
