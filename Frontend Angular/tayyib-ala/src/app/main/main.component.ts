import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as AOS from 'aos';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }
  
  ngOnInit() {
    AOS.init();
    this.getBrowser();
    var width = $(window).width();
    // console.log(width)
    if(width!>=995){
      this.animateMaxRes()
    }
    else{
      // var minRes = $('#a');
      // minRes.css({'font-size':'50px'});
      this.animateMinRes();
    }
  }

  animateMinRes(){
    $(document).ready(function(){
      var div = $("#a");  
      // div.animate({left: '50%'}, "slow");
      div.animate({fontSize: '35px'}, "slow");
      div.animate({fontWeight:'700'},"slow");
  
  });
  }
  animateMaxRes(){
    //     font-size: 150px;
    // font-weight: 700;
    $(document).ready(function(){
        var div = $("#a");  
        // div.animate({left: '200px'}, "slow");
        div.animate({fontSize: '150px'}, "slow");
        div.animate({fontWeight:'700'},"slow");
    
    });
  }
  getBrowser(){
    var ua = navigator.userAgent.toLowerCase(); 
    var changeBackgorund = document.getElementById('changeBackground');
    // console.log(changeBackgorund)
    if (ua.indexOf('safari') != -1) { 
      if (ua.indexOf('chrome') > -1) {
        console.log("chrome") // Chrome
        changeBackgorund?.classList.add('blur');
        changeBackgorund?.classList.remove('emptyWithoutAtachment');
      } else {
        console.log("safari") // Safari
        document.body.style.backgroundAttachment = "local";
        // document.body.style.background = "linear-gradient(black, gray)";
        // document.body.style.backgroundRepeat = "no-repeat";
        // document.body.style.backgroundSize = "cover";
        // document.body.style.backgroundPosition = "center";
        changeBackgorund?.classList.remove('blur');
        changeBackgorund?.classList.add('emptyWithoutAtachment')
        
      }
    }
  }
}
