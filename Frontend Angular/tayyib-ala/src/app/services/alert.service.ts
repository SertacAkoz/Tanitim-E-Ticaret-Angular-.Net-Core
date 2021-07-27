import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(head:string, value:string){
    Swal.fire({
      icon:'success',
      showConfirmButton:false,
      timer:1500,
      text:value,
      title:head,
      showClass: {
        popup: 'animated fadeInDown'
      },
      hideClass: {
        popup: 'animated fadeOutUp'
      }
    })
  }
  error(head:string, value:string){
    Swal.fire({
      icon:'error',
      showConfirmButton:false,
      timer:2000,
      text:value,
      title:head,
      showClass: {
        popup: 'animated swing'
      },
      hideClass: {
        popup: 'animated fadeOutUp'
      }
    })
  }
  loginSuccess() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Logged in successfully'
    })
  }
  logoutSuccess() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Logged out successfully'
    })
  }
}
