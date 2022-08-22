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


}
