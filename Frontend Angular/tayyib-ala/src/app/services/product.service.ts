import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'public/node_modules/rxjs';
import { AlertService } from 'public/src/app/services/alert.service';
import { BlogPost } from '../Models/blogPost';
import { Order } from '../Models/order';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient, private alert:AlertService) { }

  path ="https://localhost:44375/api/";

  getBlocksPosts():Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(this.path + "values" );
  }

  getPeoducts(){
    return this.http.get<Product[]>(this.path + "products");
  }

  addOrder(order:Order){
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    this.http.post(this.path + "products/add",order,{headers:headers}).subscribe(data=>{
      console.log("post data");
      console.log(data);
    });
    this.alert.success("Başarılı","Ürün sepetinize eklendi");
  }

  getOrderedProducts(customer_id:number):Observable<Product[]>{
    return this.http.get<Product[]>(this.path+"products/"+customer_id);
  }

  deleteOrderedProduct(product_id:number, customer_id:number){
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    this.http.post(this.path+"products/"+product_id+"/"+customer_id,{Headers:headers}).subscribe(data=>{});
    this.sleep(500).then(() => {
      location.reload();
    });
  }

  sleep(time:number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
}
