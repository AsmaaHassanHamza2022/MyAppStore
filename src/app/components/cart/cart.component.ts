import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { cartItem, userData } from 'src/app/model/model';
import { CartServiceService } from 'src/app/services/cart-service.service';
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
  public allSelectoptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public checkoutForm: any;
  public submitted: boolean = false;
  // public userData: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private _StoreService: StoreService, private fb: FormBuilder, private router: Router ,private _CartServiceService:CartServiceService) {
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

    this.totalPrice=this._CartServiceService.calculateCartTotalPrice(this.cartProductList,list);
   
  }

  reCalcTotalPrice(newCount: any, targetProduct: any) {

   this.totalPrice= this._CartServiceService.reCalcTotalPrice(this.cartProductList,newCount,targetProduct)

  }

  submit() {
    this.submitted = true;
    console.log(this.checkoutForm.value)
    localStorage.setItem("userData",JSON.stringify({name:this.checkoutForm.get('name')?.value , totalPrice:this.totalPrice}));
    // this.userData.next(this.checkoutForm.get('name')?.value);
    this.router.navigate(["/confirmation"]);

  }

  delete(id:any){
    let newValues=this._CartServiceService.deletProduct(this.cartProductList,id)
    this.cartProductList=newValues.newList;
    this.totalPrice=newValues.price;

  }
}
