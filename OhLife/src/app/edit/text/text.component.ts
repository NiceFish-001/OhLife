import { Component, OnInit} from '@angular/core';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js';//进行语言配置
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {HttpClient} from '@angular/common/http'
import {NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  public ckeditorContent:string="请开始记录属于你的记忆. . . . . .(500字)";
  public Surplus:number=500-this.ckeditorContent.length;
  public Editor=ClassicEditor;
  public config = {
    language: 'zh-cn',
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList','error'],
    uiColor: '#000',  
  };
  public insertusrl:string="http://localhost:52233/api/diaryoperation";
  constructor(public http:HttpClient,public alertinfo:NzNotificationService) {
    
   }

  ngOnInit() {
    console.log(this.Surplus);
    console.log(this.ckeditorContent)
  }

  uplode(){
    this.http.post(this.insertusrl,{
      userid:localStorage.getItem("OhlifeID"),
      diarytype:1,
      diarycontent:this.ckeditorContent,
      diarymedia:""
    }).subscribe((msg:string)=>{
      if(msg=="Yes"){
        this.alertinfo.blank(
          '来自Oh Life',
          '你在今天完美的写下你的记忆.'
        );
      }
      else{
        this.alertinfo.blank(
          '来自Oh Life',
          '真遗憾因为一些问题不能发布.'
        );
      }
    },(err:string)=>{
      console.log(err)
    })
    console.log(this.ckeditorContent)
  }


}
