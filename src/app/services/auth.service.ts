import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class AuthService {
  


  curentUser:any=new BehaviorSubject(null);


  constructor(private Client:HttpClient ) {

  }

  register(formdata:any):Observable<any>{
    return this.Client.post('http://localhost:2000/users',formdata)
  }

  login():Observable<any>{
    return this.Client.get('http://localhost:2000/users')
  }
}
