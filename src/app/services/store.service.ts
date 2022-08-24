import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { productModel } from '../model/model';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  //***********Data *********** */
  public allProduct:productModel[]=[];
  public totalPrice:number=0;

  public cartList:any[]=[];


  constructor( private http:HttpClient) {
  
   }

  //***********fetch All products from json File*********** */
  getAllData():Observable<any>{

    return this.http.get('assets/data.json');
  }


  //***********fetch product by its Id from json File*********** */

  getProductById(arr:any[],id:number):any{
   let targetProduct=arr.find((product)=>product.id ==id);
   if(targetProduct != undefined ){
    return targetProduct
   }
  }

   addToCart(data:any){

    let existProduct=this.cartList.find((product,i)=>product.item.id == data.item.id);
    console.log(existProduct);
    if(existProduct == undefined){
      this.cartList.push(data);
    }else{
      this.cartList.map((pro,i)=>{
        if(pro.item.id==existProduct.item.id){
          this.cartList[i]=data;

        }
      })
      
      
    }
    
    console.log(this.cartList);
    alert("Added To Cart :)")
   }

  calculateTotalPrice(itemPrice:number){
    this.totalPrice+=itemPrice;
    console.log(this.totalPrice);

  }


}
