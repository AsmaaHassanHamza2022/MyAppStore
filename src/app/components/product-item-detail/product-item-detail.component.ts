import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { productModel } from 'src/app/model/model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.scss']
})
export class ProductItemDetailComponent implements OnInit {

  //*************Data************ */

  public productId: number = 0;
  public product: productModel = {} as productModel;
  public productArr: productModel[] = [];
  public allSelectoptions:number[]=[1,2,3,4,5,6,7,8,9,10]
  public productCount:string="1";
  public productPrice:number=0;
  public count:number=0;

  constructor(private route: ActivatedRoute, private _StoreService: StoreService) {

  //*************Catch id from Url************ */
  this.route.queryParamMap.subscribe((res: any) => {
    if (res != null) {
      this.productId = Number(res.params.productId);
      console.log(this.productId)
    }
  }

  )
}

  ngOnInit(): void {
    //*************get target Product************ */
    this.getAllProduct();

  }

  //***********get All Product to make it shared between component *********** */
  getAllProduct() {
    this._StoreService.getAllData().subscribe(
      (res) => {
        this.getProductDetails(res);

      }
    )
  }

  //**************** get product by Id*******************

  getProductDetails(arr: any[]) {
    if (this.productId != 0) {
      let clickedProduct = this._StoreService.getProductById(arr, this.productId);
      this.product = clickedProduct;
    }

  }
  //****************get selected product *******************

  selectProductsCount(count:any,price:any){
    this.count=Number(count);
    this.productPrice=this.calculateTotalPricePerProduct(price,count);
    console.log(this.productPrice);

  }

//**************** add to cart *******************

  addToCart(){
    let item={
     item:this.product,
     totalCostForItem:this.productPrice,
     count:this.count
   }
   
   this._StoreService.addToCart(item);
 }

 //**************** Calculate price*******************

 calculateTotalPricePerProduct(unitPrice:number,count:number){
  return unitPrice *count
}

}
