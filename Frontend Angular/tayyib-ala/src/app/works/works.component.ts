import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../Models/blogPost';
import { ProductService } from '../services/product.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  constructor(private productService:ProductService) { }

  blogPosts:BlogPost[] | undefined;

  ngOnInit() {
    this.productService.getBlocksPosts().subscribe(data =>{
      this.blogPosts = data;
      console.log(this.blogPosts);
    });
    this.animateProducts();
  }

  animateProducts(){
    $(document).ready(function(){
      var animProducts = $("#animWork");
      // animProducts.css("opacity","0");
      // animProducts.css("opacity","1");
      console.log(animProducts.css("opacity"));

      if(animProducts.css("opacity") == undefined){
        location.reload();
      }
      animProducts.animate({opacity: '1'}, "slow");
  });
  }


}
