import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { productModel } from 'src/app/model/model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  //**************************Inputs****************************** */
  @Input()  item:productModel={} as productModel;

  //**************************Output****************************** */

  @Output() Click=new EventEmitter();

  // @Output() pushToCart=new EventEmitter();


  /******************************data********************************* */
  public allSelectoptions:number[]=[1,2,3,4,5,6,7,8,9,10];
  public productCount:string="1";
  public productPrice:number=0;
  public count:number=0;


  constructor(private _StoreService:StoreService) { }

  ngOnInit(): void {
  }


  //*******************************Logic************************************ */
  goToProductDetails(data:any){
    this.Click.emit(data);
  }

  selectProductsCount(count:any,price:any){
    this.count=Number(count);
    this.productPrice=this.calculateTotalPricePerProduct(price,count);
    console.log(this.productPrice);

  }

  calculateTotalPricePerProduct(unitPrice:number,count:number){
    return unitPrice *count
  }

  addToCart(){

     let item={
      item:this.item,
      totalCostForItem:this.productPrice,
      count:this.count
    }
    
    this._StoreService.addToCart(item);

   

  }

}
