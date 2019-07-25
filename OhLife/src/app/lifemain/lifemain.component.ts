import { Component, OnInit } from '@angular/core';
import{slideToRight} from '../animations/animations';
import {NavigationEnd,Router} from '@angular/router'
import {HttpClient} from '@angular/common/http'
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-lifemain',
  templateUrl: './lifemain.component.html',
  styleUrls: ['./lifemain.component.css'],
  animations:[slideToRight]
})
export class LifemainComponent implements OnInit {

  public pagetext:string="Alldiarypage";
  public ulopen:string="ul1open";
  public btnswith:boolean=false;
  public stringurl:string='http://localhost:52233/api/Login/loginstate';
  constructor(public router:Router,public http:HttpClient,public alertinfo:NzNotificationService) { 
   this.loginstate();
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        switch(event.url){
          case "/lifemainpage":{
            if(localStorage.getItem("OhlifeID")==null){
              this.router.navigate(['loginpage'])
            }
            this.pagetext="Alldiarypage";
            this.ulopen="ul1open";
            break;
          }
          case "/lifemainpage/(Sonroute:Alldiarypicturepage)":{
            this.pagetext="Alldiarypicturepage";
            this.ulopen="ul1open";
            break;
          }
          case "/lifemainpage/(Sonroute:Alldiaryaudiopage)":{
            this.pagetext="Alldiaryaudiopage";
            this.ulopen="ul1open";
            break;
          }
          case "/lifemainpage/(Sonroute:Alldiarypage)":{
            this.pagetext="Alldiarypage";
            this.ulopen="ul1open";
            break;
          }
          case "/lifemainpage/(Sonroute:textpage)":{
            this.pagetext="textpage";
            this.ulopen="ul2open";
            break;
          }
          case "/lifemainpage/(Sonroute:picturepage)":{
            if(localStorage.getItem("vipstate")=="false")
            {
              this.alertinfo.blank(
                '来自Oh Life',
                '您还没有开通vip不可以发布图文日记！！！'
              );
              history.back();
            }
            this.pagetext="picturepage";
            this.ulopen="ul2open";
            break;
          }
          case "/lifemainpage/(Sonroute:Audiopage)":{
            if(localStorage.getItem("vipstate")=="false")
            {
              this.alertinfo.blank(
                '来自Oh Life',
                '您还没有开通vip不可以发布音频日记！！！'
              );
              history.back();
            }
            
            this.pagetext="Audiopage";
            this.ulopen="ul2open";
            break;
          }
          case "/lifemainpage/(Sonroute:setuppage)":{
            this.pagetext="setuppage";
            break;
          }
        }
      }
    })
  }

  ngOnInit() {
  }

  translate(){
    localStorage.removeItem('OhlifeID')
    this.router.navigate(['loginpage'])
  }

  loginstate()
  {
    var today = new Date();
    console.log(today.toString());
    
    this.http.post(this.stringurl,{
      userid:localStorage.getItem("OhlifeID")
    }).subscribe((msg:any)=>{
      this.btnswith=msg.info[0].Memberstate;
      localStorage.setItem("vipstate",msg.info[0].Memberstate)
      if (msg.date==new Date(parseInt(msg.info[0].Memberover.substr(6, 13))).toLocaleDateString()) {
        localStorage.setItem("vipstate","false")
      }
      console.log(localStorage.getItem("vipstate"))
    },(err:any)=>{

    })
  }

}
