import { Component, OnInit,Input } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { NzMessageService,NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-alldiary',
  templateUrl: './alldiary.component.html',
  styleUrls: ['./alldiary.component.css']
})
export class AlldiaryComponent implements OnInit {
  //定义变量接收分页请求返回的全部日记
  public alldiary:any;
  //定义变量读取当前用户的账号ID
  public userID:string=localStorage.getItem("OhlifeID")
  //定义请求路径
  public urlsss:string="http://localhost:52233/api/Diary";
  //定义变量接收全部日记的总条数实现分页
  public nzTotal:number;//
  //定义变量接收选中的日记信息
  public diaryinfo:any;
  //定义bool类型变量控制日记显示页面的显示隐藏
  public isshow:boolean=false;
  //定义int类型变量用来接收当前选中页码用于删除回调刷新
  public pagenumber:number=1;
   //定义定义bool类型变量控制日记空白页面的显示隐藏
   public emptyshow:boolean=false;
  constructor(public http:HttpClient,public alertmsg: NzMessageService,public alertinfo:NzNotificationService) { 
    //构造中调用  默认加载第一页
    this.diarypage(1,7);
  }

  ngOnInit() {

  }

  onValueChange(value:Date){
    //console.log(value.getFullYear())
    let diarytime=this.formatDate(value);
    this.diaryortime(1,7,diarytime.toString());
  }
  //对date类型的数据进行格式化
   formatDate = function (date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
   // m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
   // d = d < 10 ? ('0' + d) : d;   
    return y + '/' + m + '/' + d;  
};
  
  //定义分页函数实现分页
  diarypage(index:any,size:any){
    this.http.post(this.urlsss,{userID:this.userID,diaryindex:index,diarysize:size,diarytype:1}).subscribe((msg:any)=>{
      console.log(msg)
      if(msg.rows.length>0){
        this.emptyshow=false;
        console.log(msg)
        this.alldiary=msg.rows;
        this.nzTotal=msg.nzTotal;
      } else{
        this.emptyshow=true;
      }
    },(err:any)=>{
      console.log(err)
    })
  }
  //通过日期来选择日记
  diaryortime(index:any,size:any,selecttime:any){
    this.http.post(this.urlsss+'/diaryortime',{userID:this.userID,diaryindex:index,diarysize:size,diarytype:1,diarytime:selecttime}).subscribe((msg:any)=>{
      if(msg.rows.length>0){
        this.alldiary=msg.rows;
        this.nzTotal=msg.nzTotal;
      } 
      else{
        this.alertinfo.blank(
          '来自Oh Life',
          '真遗憾这天你没有记录属于你的记忆.'
        );
      }
    },(err:any)=>{
      console.log(err)
    })
  }
  
  //定义函数加载选中的日记到日记组件
  slect(index:number)
  {
    let pagenumer:number= this.alldiary[index].DiaryinfoID
    
    this.http.post(this.urlsss+'/diarycontent',{pagenum:pagenumer}).subscribe((msg:any)=>{
      this.diaryinfo=msg;
      this.isshow=true;
    },(err:any)=>{
      console.log(err);
    })
  }
  //分页回调  点击页码实现分页
  paging(index:any)//分页
  {
    this.pagenumber=index;
   this.diarypage(index,7)
  }
  //关闭日记页面
  diarypagehide()
  {
    this.isshow=false;
  }
  //弹框取消删除回调函数
  cancel():void {
    this.alertmsg.info('已取消删除操作');
  }
  //弹框确认删除回调函数
  confirm():void {
   this.http.post(this.urlsss+'/diarydelete',{pagenum:this.diaryinfo[0].DiaryinfoID}).subscribe((msg:any)=>{
      console.log(msg)
      if(msg=="Yes")
      {
        this.alertmsg.info('已完成删除');
        this.diarypage(this.pagenumber,7);
        this.isshow=false;
      }
      else{
        this.alertmsg.info('删除失败');
      }
    },(err:any)=>{
      console.log(err)
    })
  }
}
