import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { OrdersComponent } from './orders/orders.component';
import { ShopComponent } from './shop/shop.component';
import { WorksComponent } from './works/works.component';

const routes: Routes = [
  {path:"main", component:MainComponent},
  {path:"works", component:WorksComponent},
  {path:"shop", component:ShopComponent},
  {path:"orders", component:OrdersComponent},
  {path:"**",redirectTo:"main",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
