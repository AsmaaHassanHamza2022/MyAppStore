import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {
    path:'' ,redirectTo:'productlist' ,pathMatch:'full'
  },
  {
    path:'productlist' ,component:ProductListComponent ,pathMatch:'full'
  },
  {
    path:'details' ,component:ProductItemDetailComponent , pathMatch:'full'
  },{
    path:'cart' ,component:CartComponent ,pathMatch:'full'
  },
  {
    path:'confirmation',component:ConfirmationComponent,pathMatch:'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
