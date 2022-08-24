import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { cartItem, userData } from 'src/app/model/model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  //******************************Data***************************** */
  public cartProductList: cartItem[] = [];
  public totalPrice: number = 0;
  public allSelectoptions: number[] = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public checkoutForm: any;
  public submitted: boolean = false;
  // public userData: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private _StoreService: StoreService, private fb: FormBuilder, private router: Router) {
    this.createForm();
    this.cartProductList = this._StoreService.cartList;
    this.calculateCartTotalPrice();

    console.log(this.cartProductList)
  }

  ngOnInit(): void {
  }

  createForm() {
    this.checkoutForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      address: [null, [Validators.required, Validators.minLength(6)]],
      credit: [null, [Validators.required, Validators.minLength(16), Validators.maxLength(16)]]
    })
  }

  calculateCartTotalPrice(list?:any[]) {
    this.totalPrice=0;
    let productList=[];

    if(list !=null){
      productList=list
    }else{
      productList=this.cartProductList;
    }

    productList.forEach((item) => {
      this.totalPrice += item.totalCostForItem;
    })

  }

  reCalcTotalPrice(newCount: any, targetProduct: any) {
    this.totalPrice = 0;

    this.cartProductList.forEach((pro, i) => {
      if (pro.item.id == targetProduct.id) {

        if (newCount == 0) {
          this.cartProductList.splice(i, 1);
          console.log(this.cartProductList)
        } else {
          //modify count number and total cost for Item

          pro.count = newCount;
          pro.totalCostForItem = newCount * pro.item.price;
        }
      }
      this.calculateCartTotalPrice(this.cartProductList);
    })

  }

  submit() {
    this.submitted = true;
    console.log(this.checkoutForm.value)
    localStorage.setItem("userData",JSON.stringify({name:this.checkoutForm.get('name')?.value , totalPrice:this.totalPrice}));
    // this.userData.next(this.checkoutForm.get('name')?.value);
    this.router.navigate(["/confirmation"]);

  }
}
