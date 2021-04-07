import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  registerForm:any;
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
}
