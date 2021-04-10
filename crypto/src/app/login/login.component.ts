import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private loginService:LoginService,private router:Router) { }
  loginForm:any;
  email:any;
  password:any;
  userDetails:any;
  errorMessage:any;
  userObj:any;

  ngOnInit(): void {
    this.loginForm= this.fb.group({
      name:['',[Validators.required,Validators.minLength(4)]],
      password:['',[Validators.required,this.validatePwd]]
    })
  }
  hide = true;

  validatePwd(c:FormControl){
    let re=/[a-zA-Z]*[0-9]{1}/;
    return re.test(c.value)?null:{
      pwdError:"Password should have atleast 1 number"
    }
  }


  submit(){
    this.userObj={
      "userName":this.loginForm.value.name,
      "password":this.loginForm.value.password
    }
    this.loginService.login(this.userObj).subscribe((success:any)=>
    {
      this.userDetails=success;
      console.log(this.userDetails)
      if(this.userDetails){
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username',this.userDetails.userName)
        sessionStorage.setItem('userId',this.userDetails.userId)
        this.router.navigateByUrl('/search',{ state: { loggedIn:true}})
      }
    },(error:any)=>this.errorMessage=error.error.message);
    
    
  }
}
