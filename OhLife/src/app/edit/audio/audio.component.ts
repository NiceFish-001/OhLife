import { Component, OnInit,Renderer2} from '@angular/core';
import "../../../assets/record/record.js";
import {HttpClient} from '@angular/common/http';
import {NzNotificationService} from 'ng-zorro-antd';


declare var openmike : any 
declare var audioogject : any 
declare var mediaRecorder : any
@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

  public baseobj:any;
  public inputValue:string='请添加你的日记标题......';
  public upurl='http://localhost:52233/api/';
  public isVisible=false;
  constructor(public http:HttpClient,public alertinfo:NzNotificationService) {
    this.alertinfo.blank(
      '来自Oh Life',
      '在录制音频日记之前记得要先打开麦克风哦，同时不要忘了添加自己的日记标题！！！'
    );
  }

  ngOnInit() {

  }
  open()
  {
    openmike()   
  }
  start(){
    mediaRecorder.start();   
  }
  playRecording()
  {
    mediaRecorder.stop();
  }
  uplodeaudio()
  {
    this.isVisible=true
    console.log(this.baseobj);
    this.http.post(this.upurl+'diaryoperation/audiouplode',{audioinfo:this.baseobj})
    .subscribe((msg)=>{
      if (msg=="No") {
        this.alertinfo.blank(
          '来自Oh Life',
          '录制音频保存出错！！'
        );
      }
      else
      {
        this.http.post(this.upurl+'diaryoperation',{
          userid:localStorage.getItem("OhlifeID"),
          diarytype:3,
          diarycontent:this.inputValue,
          diarymedia:msg
        }).subscribe((msg:string)=>{
          if(msg=="Yes"){
            this.isVisible=false;
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
      }
    },(err)=>{
      this.alertinfo.blank(
        '来自Oh Life',
        '上传日记出错请重新录制发布！！！'
      );
    })
  }
  bianyi(){
    function bolbtobase(file){
      return new Promise(function(resolve,reject){
        let Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload=function(){
          resolve(this.result)
        }
      })
    }
    bolbtobase(audioogject).then((msg)=>{
      this.baseobj=msg;
      console.log(this.baseobj);
    })

  }
}