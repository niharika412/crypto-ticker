import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(userDetails:Object):Observable<any>{
    // console.log(userDetails)
    return this.http.put('http://localhost:3000/login',userDetails);
  }
}
