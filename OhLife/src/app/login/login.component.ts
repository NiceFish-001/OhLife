import { Component, OnInit } from '@angular/core';
import{slideToRight} from '../animations/animations';
import{RouterModule,Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[slideToRight],
})
export class LoginComponent implements OnInit {

  public username:string;
  public password:string;
  public isBack:any=false;
  public anyList:any;
  public urlsss:string="http://localhost:52233/api/Login";
  
  constructor(public router:Router,public http:HttpClient) {
    if(localStorage.getItem("OhlifeID")!=null){
      this.router.navigate(['lifemainpage'])
    }
   }

  ngOnInit() {
    
  }

  register()
  {
    this.router.navigate(['registerpage'])
  }

  login()
  {
    let data:any={
      name:this.username,
      pwd:this.password
    }
   
    this.http.post(this.urlsss,data).subscribe((msg:any)=>{
      if(msg.length>0){
        this.isBack=false;
        localStorage.setItem("OhlifeID",msg[0].User_tbID);
        console.log(localStorage.getItem("OhlifeID"));
        this.router.navigate(['lifemainpage'])
      } 
      else{
        this.isBack=true;
      } 
    },err=>{
      console.log(err)
    })
  }
}
