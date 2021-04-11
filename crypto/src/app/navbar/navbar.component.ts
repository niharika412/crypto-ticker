import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }
  username:any;

  @Input()
  loggedIn:any;
  reload(){
    window.location.reload();
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username");
    this.loggedIn = sessionStorage.getItem("loggedIn");
    if(this.loggedIn=="true"){
      this.loggedIn=true;
    }
  }

  logOut(){
    sessionStorage.setItem('loggedIn',"false");
    sessionStorage.setItem('username',"");
    this.loggedIn=false;
    this.router.navigate(["/search"])
  }

  
}
