import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,HttpClientModule],
  providers:[AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm=new FormGroup({
      name:new FormControl(null,[Validators.required,Validators.minLength(3)]),
      uemail:new FormControl(null,[Validators.email,Validators.required]),
      password:new FormControl(null,[Validators.required]),
      role:new FormControl('user'),
  })
  constructor(private Auth:AuthService,private Router:Router) {
  
  }

  submitForm(registerForm:FormGroup){
    console.log(registerForm.value);
    this.Auth.register(registerForm.value).subscribe((res)=>{
      console.log(res);
      this.Router.navigate(['login'])

    })
  }
  // submitForm(registerForm:FormGroup){
  //   // console.log(registerForm.value);
  //   // this._AuthService.register(registerForm.value).subscribe(
  //   //   (res)=>{
  //   //     console.log(res);
  //   //   }
  //   // )
  // }
}