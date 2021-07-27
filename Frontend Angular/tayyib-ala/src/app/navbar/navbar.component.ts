import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../Models/customer';
import { LoginUser } from '../Models/loginUser';
import { RegisterUser } from '../Models/registerUser';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private alert:AlertService, private authservice:AuthService) { }

  registerUser:RegisterUser = new RegisterUser;
  loginUser:LoginUser = new LoginUser;

  loginForm!:FormGroup;
  registerForm!:FormGroup;

  currentCustomer:Customer = new Customer();

  ngOnInit() {
    this.createLoginForm()
    this.createRegisterForm()
    this.NavbarColor()
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      emailLogin:["",[Validators.required]],
      pswLogin:["",[Validators.required, Validators.minLength(4)]]
    })
  }
  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      emailRegister:["",[Validators.required]],
      pswRegister:["",[Validators.required, Validators.minLength(4)]],
      cpswRegister:["",[Validators.required]],
      fNameRegister:["",[Validators.required]],
      lNameRegister:["",[Validators.required]]
    })
  }
  formIsValidLogin(){
    const idArray = ['email','psw'];

    console.log(this.loginForm.get('emailLogin')?.valid)
    idArray.forEach(element => {
      if(!(this.loginForm.get(element+'Login')?.valid)){
        document.getElementById(element)?.classList.add('is-invalid');
        document.getElementById(element)?.classList.remove('is-valid');
      }
      else{
        document.getElementById(element)?.classList.add('is-valid');
        document.getElementById(element)?.classList.remove('is-invalid');
      }
      if(element == 'email'){
        // console.log('asdasdasd :' + this.ValidateEmail(this.loginForm.get('emailLogin')?.value))
        if( !(this.ValidateEmail(this.loginForm.get('emailLogin')?.value))){
          document.getElementById(element)?.classList.add('is-invalid');
          document.getElementById(element)?.classList.remove('is-valid');
        }
      }
    });

    if(this.loginForm.get('emailLogin')?.valid && this.loginForm.get('pswLogin')?.valid){
      
      if(this.ValidateEmail(this.loginForm.get('emailLogin')?.value)){
        this.loginUser.e_mail = this.loginForm.get('emailLogin')?.value;
        this.loginUser.password = this.loginForm.get('pswLogin')?.value;
        // console.log(this.loginUser.e_mail);
        this.authservice.login(this.loginUser)
       
        this.authservice.getCurrentUser(this.loginUser.e_mail).subscribe(data=>{
          this.currentCustomer = data;
          console.log(this.currentCustomer);
          this.authservice.saveCurrentUserId(this.currentCustomer);
          // console.log("Currnet User İd :",localStorage.getItem("currentUser"));
        });

        this.sleep(500).then(() => {
          // Do something after the sleep!
          if(localStorage.getItem("token") == null){
            this.alert.error("Hata","Böyle bir kullanıcı bulunamadı");
            // document.getElementById('email')?.classList.remove('is-valid');
            // document.getElementById('psw')?.classList.remove('is-valid');
            // document.getElementById('email')?.classList.add('is-invalid');
            // document.getElementById('psw')?.classList.add('is-invalid');
          }else{
            this.alert.loginSuccess()
            document.getElementById('id01')!.style.display='none';
          }
        });
      }
      else{
        this.alert.error('Hata','Lütfen geçerli bir email giriniz');
      }
    }
    else{
      this.alert.error('Hata','Lütfen formu kontrol ediniz');
    }
  }

  sleep(time:number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  formIsValidRegister(){
    const idArray = ['email','psw','cpsw','fName','lName'];

    console.log(this.registerForm.get('emailRegister')?.valid)
    idArray.forEach(element => {
      if(!(this.registerForm.get(element+'Register')?.valid)){
        document.getElementById(element+'Register')?.classList.add('is-invalid');
        document.getElementById(element+'Register')?.classList.remove('is-valid');
      }
      else{
        document.getElementById(element+'Register')?.classList.add('is-valid');
        document.getElementById(element+'Register')?.classList.remove('is-invalid');
      }
      if(element == 'email'){
        console.log('asdasdasd :' + this.ValidateEmail(this.registerForm.get('emailRegister')?.value))
        if( !(this.ValidateEmail(this.registerForm.get('emailRegister')?.value)) || !(this.registerForm.get(element+'Register')?.valid)){
          document.getElementById(element+'Register')?.classList.add('is-invalid');
          document.getElementById(element+'Register')?.classList.remove('is-valid');
        }
      }
      if(!(this.registerForm.get('pswRegister')?.value === this.registerForm.get('cpswRegister')?.value)){
        document.getElementById('cpswRegister')?.classList.add('is-invalid');
        document.getElementById('pswRegister')?.classList.add('is-invalid');
      }
    });

    if((this.registerForm.get('emailRegister')?.valid && this.registerForm.get('pswRegister')?.valid && this.registerForm.get('cpswRegister')?.valid) && (this.registerForm.get('pswRegister')?.value === this.registerForm.get('cpswRegister')?.value) && this.registerForm.get('fNameRegister')?.valid && this.registerForm.get('lNameRegister')?.valid){
      
      if(this.ValidateEmail(this.registerForm.get('emailRegister')?.value)){
        
        // this.registerUserAny=Object.assign({},this.registerForm.value);
        this.registerUser.e_mail = this.registerForm.get('emailRegister')?.value;
        this.registerUser.firstname = this.registerForm.get('fNameRegister')?.value;
        this.registerUser.lastname = this.registerForm.get('lNameRegister')?.value;
        this.registerUser.password = this.registerForm.get('pswRegister')?.value;
        console.log(this.registerUser);
        this.authservice.register(this.registerUser);
        this.alert.loginSuccess()
      }
      else{
        this.alert.error('Hata','Lütfen geçerli bir email giriniz');
      }
    }
    else{
      this.alert.error('Hata','Lütfen formu kontrol ediniz');
    }
  }

  isAuthenticated(){
    if(localStorage.getItem("token")==null)
    {
      return false;
    }
    return true;
  }

  logOut(){
    this.authservice.logOut();
  }

  ValidateEmail(email:string) 
  {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
    {
      // this.alert.success("Email","Valid");
      return (true)
    }
      // alert("You have entered an invalid email address!");
      return (false)
  }

  NavbarColor(){
    document.addEventListener("DOMContentLoaded", function(){
      window.addEventListener('scroll', function(){
        var main = document.getElementById('main');
        var scroll = document.getElementById('scroll');
      if (window.scrollY > 50){
        // console.log("javascript in html");
        main!.style.backgroundColor ='burlywood';
        scroll!.style.backgroundColor ='burlywood';
        scroll!.style.borderBottom = 'solid';
        scroll!.style.borderColor = 'white';
        scroll!.style.borderRadius = '10%';
      }
      else{
        main!.style.background = 'transparent'
        scroll!.style.background = 'transparent'
        scroll!.style.border = 'none';
      }
    })
  }); 
  }
}
