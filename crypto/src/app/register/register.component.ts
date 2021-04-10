import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router,private fb:FormBuilder,private regService:RegisterService,private _snackBar: MatSnackBar) { }

  registerForm:any;
  successMessage:any;
  errorMessage:any;

  ngOnInit(): void {
    this.registerForm= this.fb.group({
      name:['',[Validators.required,Validators.minLength(4)]],
      email:['',[Validators.required, this.validateEmail]],
      password:['',[Validators.required,this.validatePwd]],
      dob:['',[Validators.required,this.validateDOB]]
    })
  }
  hide:boolean=true;

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

  validateDOB(c:FormControl){
    let today= new Date();
    let date= new Date(c.value);
    console.log(today,date)
    if(date>=today) return {dobError:"DOB should be less than today's date."}
    else return null
  }
  userObj:any;
  userDetails:any;
  register(){
    this.userObj={
      "userName":this.registerForm.value.name,
      "password":this.registerForm.value.password,
      "dob":this.registerForm.value.dob,
      "email":this.registerForm.value.email
    }
    this.regService.register(this.userObj).subscribe((success:any)=>
    {   
      this.userDetails=success;
      this._snackBar.open("Registration successful ! {´◕ ◡ ◕｀}", "❎", {
        duration: 2000,
      });
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username',this.userDetails.userName)
        sessionStorage.setItem('userId',this.userDetails.userId)
        this.router.navigate(['/search'])
  
    },(error:any)=>this.errorMessage=error.message)
  }
}
