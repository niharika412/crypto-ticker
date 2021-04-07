import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  loginForm:any;
  email:any;
  password:any;

  ngOnInit(): void {
    this.loginForm= this.fb.group({
      email:['',[Validators.required, this.validateEmail]],
      password:['',[Validators.required,this.validatePwd]]
    })
  }
  hide = true;

  validateEmail(c:FormControl){
    let re=/^\S+@\S+$/;
    return re.test(c.value)?null:{
      emailError:"Email is invalid"
    }
  }

  validatePwd(c:FormControl){
    let re=/[a-zA-Z]*[0-9]{1}/;
    return re.test(c.value)?null:{
      pwdError:"Password should have atleast 1 number"
    }
  }
}
