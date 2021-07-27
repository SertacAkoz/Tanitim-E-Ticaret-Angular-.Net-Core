import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/product';
import { ProductService } from '../services/product.service';
import * as $ from 'jquery';
import { Customer } from '../Models/customer';
import { Order } from '../Models/order';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private productService:ProductService) { }

  products:Product[] | undefined;
  currentCustomer:Customer = new Customer();
  order:Order = new Order();

  ngOnInit() {
    this.setLocalStorage();
    console.log(this.currentCustomer);
    this.productService.getPeoducts().subscribe(data=>{
      this.products = data;
      console.log(data)
    });
    this.animateProducts();
  }

  animateProducts(){
    $(document).ready(function(){
      var animProducts = $("#anim");
      // animProducts.css("opacity","0");
      // animProducts.css("opacity","1");
      // console.log(animProducts.css("opacity"));
      if(animProducts.css("opacity") == undefined){
        location.reload();
      }
      animProducts.animate({opacity: '1'}, "slow");
  });
  }

  setLocalStorage(){
    this.currentCustomer.id = parseInt(localStorage.getItem("currentUserId")!);
    this.currentCustomer.e_mail = localStorage.getItem("currentUserEmail")!;
    this.currentCustomer.firstname = localStorage.getItem("currentUserFirstname")!;
    this.currentCustomer.lastname = localStorage.getItem("curentUserLastname")!;
    this.currentCustomer.money = parseInt(localStorage.getItem("currentUserMoney")!); 

  }

  addOrder(customerId:number, productId:number){
    this.order.customer_id = customerId;
    this.order.product_id = productId;
    console.log(this.order);
    this.productService.addOrder(this.order);
  }


}
