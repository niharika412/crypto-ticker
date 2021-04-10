import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  register(userDetails:Object):Observable<any>{
    // console.log(userDetails)
    return this.http.post('http://localhost:3000/register',userDetails);
  }
}
