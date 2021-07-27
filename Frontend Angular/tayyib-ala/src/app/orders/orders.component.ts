import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private productService:ProductService) { }

  products:Product[] | undefined;
  customer_id!:number;

  ngOnInit() {
    try {
      this.getOrderedProducts();
    } catch (error) {
    }

    
  }

  getOrderedProducts(){
    this.customer_id = parseInt(localStorage.getItem("currentUserId")!);
    this.productService.getOrderedProducts(this.customer_id).subscribe(data=>{
      this.products=data;
      console.log(this.products);
    });
  }

  deleteOrderedProducts(product_id:number, customer_id:number){
    this.productService.deleteOrderedProduct(product_id,customer_id);
    console.log(product_id , customer_id);
  }
}
