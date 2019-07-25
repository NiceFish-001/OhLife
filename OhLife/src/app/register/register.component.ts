import { Component, OnInit } from '@angular/core';
import{slideToRight} from '../animations/animations';
import{RouterModule,Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations:[slideToRight],
})
export class RegisterComponent implements OnInit {

  public username:string;
  public password:string;
  public isBack:any=false;
  public newpassword:string;
  public urlsss:string="http://localhost:52233/api/Login";
  constructor(public router:Router,public http:HttpClient) { }

  ngOnInit() {
  }


  pwdyz(newpwd:string)
  {
    if (this.password!=this.newpassword) {
      this.isBack=true;
    }
    else{
      this.isBack=false;
    }
  }

  login()
  {
    
    let data:any={
      Accountnumber:this.username,
      pwd:this.password
    }
   
    this.http.post(this.urlsss+'/newuser',data).subscribe((msg:any)=>{
      if(msg=="Yes"){
        this.router.navigate(['loginpage'])
      } 
      else{
        this.isBack=true;
      } 
    },err=>{
      console.log(err)
    })
  }

}
