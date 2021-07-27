import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'public/node_modules/rxjs';
import { Customer } from '../Models/customer';
import { LoginUser } from '../Models/loginUser';
import { RegisterUser } from '../Models/registerUser';
import { Router } from '@angular/router';
import { AlertService } from 'public/src/app/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router:Router, private alertService:AlertService) { }

  path = "https://localhost:44375/api/auth";
  jwtHelper:JwtHelperService = new JwtHelperService();
  TOKEN_KEY="token";
  decodedToken:any;
  userToken:any;

  login(loginUser:LoginUser){
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    this.http.post(this.path+"/login",loginUser,{headers:headers}).subscribe(data=>{
      this.saveToken(data);
      this.userToken = data;
      console.log(this.userToken);
      this.decodedToken = this.jwtHelper.decodeToken(this.userToken);
      this.router.navigateByUrl('/main');
    })

  }

  register(registerUser:RegisterUser){
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    this.http.post(this.path+"/register",registerUser,{headers:headers}).subscribe(data=>{})
  }

  logOut(){
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUserEmail");
    localStorage.removeItem("currentUserMoney");
    localStorage.removeItem("currentUserFirstname");
    localStorage.removeItem("curentUserLastname");
    this.router.navigateByUrl('/main');
    this.alertService.logoutSuccess();
  }

  loggedIn(){
    //tokenın süresi geçmiş mi?
    return this.jwtHelper.isTokenExpired(this.TOKEN_KEY);
  }

  // getCurrentUserId(){
  //   nameid jwt standartlarından geliyor.
  //   return this.jwtHelper.decodeToken(localStorage.getItem(this.TOKEN_KEY) || '{}').nameid;
  // }

  getCurrentUser(e_mail:string):Observable<Customer>{
    return this.http.get<Customer>(this.path + "/" + e_mail);
  }

  saveToken(token:any){
    localStorage.setItem(this.TOKEN_KEY,token);
  }

  saveCurrentUserId(currentUser:Customer){
    localStorage.setItem("currentUserId",currentUser.id.toString());
    localStorage.setItem("currentUserEmail",currentUser.e_mail);
    localStorage.setItem("currentUserMoney",currentUser.money.toString());
    localStorage.setItem("currentUserFirstname",currentUser.firstname);
    localStorage.setItem("curentUserLastname",currentUser.lastname);
  }

}
