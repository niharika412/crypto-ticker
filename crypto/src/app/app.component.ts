import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crypto';
  loggedIn:any;
  username:any;
  reload(){
    window.location.reload();
  }
  constructor(private router:Router, private ar:ActivatedRoute){
  }
  ngOnInit(){

    this.ar.data.subscribe((data:any)=>
      this.loggedIn=data.loggedIn)
    // if(sessionStorage.getItem('loggedIn')=='true'){
    //   this.loggedIn=true;
    //   this.username=sessionStorage.getItem('username')
    //   console.log(this.loggedIn)
    // }
  }

}
