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

}
