import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {UploadFile,NzNotificationService} from 'ng-zorro-antd'
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js';//进行语言配置
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {
//对富文本框进行设置
  public ckeditorContent:string="请开始记录属于你的记忆. . . . . .(500字)";
  public Surplus:number=500-this.ckeditorContent.length;
  public Editor=ClassicEditor;
  public config = {
    language: 'zh-cn',
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList','error'],
    uiColor: '#000',  
  };
//对图片上传做出配置
  public showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  public  fileList = [];
  public previewImage: string | undefined = '';
  public previewVisible = false;
  //
  public pictureurl:string="http://localhost:52233/";
  //public insertusrl:string="http://localhost:52233/api/diaryoperation";
  constructor(public alertinfo:NzNotificationService,public http:HttpClient) { }

  ngOnInit() {

  }




  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  handleChange(inf0:any):void{
    if (inf0.type=="error") {
      this.alertinfo.blank(
        '来自Oh Life',
        '真遗憾因为一些问题上传失败！！！'
      );
    }
    
  }

  //http://localhost:52233/img/10.jpg

  uplode(){
    var picturename:string="";
    for (let index = 0; index < this.fileList.length; index++) {
      picturename+=this.pictureurl+"img/"+this.fileList[index].name+";";
    }
    this.http.post(this.pictureurl+'api/diaryoperation',{
      userid:localStorage.getItem("OhlifeID"),
      diarytype:2,
      diarycontent:this.ckeditorContent,
      diarymedia:picturename
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
  }
}
