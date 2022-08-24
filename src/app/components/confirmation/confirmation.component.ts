import { Component, OnInit } from '@angular/core';
import { userData } from 'src/app/model/model';
import { StoreService } from 'src/app/services/store.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  providers:[CartComponent]
})
export class ConfirmationComponent implements OnInit {

  //**********************************Data********************************** */
  // public userData:userData={} as userData
  public userName:string='';
  public totalPrice:number=0;

  constructor( private _CartComponent:CartComponent,private _StoreService:StoreService ) {

   }

  ngOnInit(): void {
    this.totalPrice=this._StoreService.totalPrice;
    
     this.getUserData();
    
  }

  getUserData(){

    let data=JSON.parse(localStorage.getItem("userData")!);
    
    this.userName=data.name;
    this.totalPrice=data.totalPrice;


  //   alert("iam here")
  //   this._CartComponent.userData.subscribe(
  //     {
  //       next:(res)=>{
  //         this.userData=res;
  //         console.log(this.userData)
  //       }
  //     }
  //   )
  }

}
