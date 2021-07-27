import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorksComponent } from './works/works.component';
import { ShopComponent } from './shop/shop.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [					
    AppComponent,
      NavbarComponent,
      MainComponent,
      WorksComponent,
      ShopComponent,
      OrdersComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
