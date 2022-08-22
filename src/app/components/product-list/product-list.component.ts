import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { productModel } from 'src/app/model/model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    // *******************************Data***************************

    public allProducts:productModel[]=[]
    public allSelectoptions:number[]=[1,2,3,4,5,6,7,8,9,10];


  constructor(private _StoreService:StoreService,private router:Router) {

    // *******************************get All Products ***************************
    this. getAllProduct();
   }

  ngOnInit(): void {
  }

 //=================================================Logic==========================================
 
 //**************** get All Data*******************

 getAllProduct(){
  this._StoreService.getAllData().subscribe(
    (res)=>{
     this.allProducts=res;
    }
  )
 }

 goToProductDetails(id:number|undefined){

  this.router.navigate(["/details"],{ queryParams: { productId: id } })

 }

}
