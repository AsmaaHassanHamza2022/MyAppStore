import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
