import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,HttpClientModule],
providers:[AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginError:string='';
  registerForm=new FormGroup({
    uemail:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.required]),
})
/**
 *
 */
constructor(private Auth:AuthService,private Router:Router) {
  
    
}

submitForm(registerForm:FormGroup){
  console.log(registerForm.value);
  this.Auth.login().subscribe((res)=>{
    let user = res.find((ele: { uemail: any }) => {
                return ele.uemail === registerForm.value.uemail
              }) 
    if(user){
      if(user.password === registerForm.value.password)
       {
        localStorage.setItem('user',JSON.stringify(user))
        this.Router.navigate(['/home'])
       }
      else
        this.loginError = 'Email or password is incorrect';
    }
  })
}
}
