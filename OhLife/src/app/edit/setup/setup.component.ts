import { Component, OnInit } from '@angular/core';
import {QRCodeModule} from 'angular2-qrcode'
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { NzMessageService,NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  public stringurl:string="http://localhost:52233/";
  public moneyzf:string;
  public month:number=0;
  public oldpwd:string;
  public newpwd:string;
  public isVisible = false;
  public alldiarycount:any=[];
  public vipstate:string=localStorage.getItem("vipstate");
  public payment:any={
    orderId:"",
    appId:"XNXCBVCNXrg85D3A2D0DF153D588BB5C"
  }
  public goodid:any=[
  'ohlifeonemoney',
  'ohlifetwomoney',
  'ohlifethreemoney',
  'ohlifeforemoney',
  'ohlifefivemoney',
  'ohlifesixmoney',
  'ohlifeservenmoney',
  'ohlifeEightmoney',
  'ohlifeNinemoney',
  'ohlifeTenmoney',
  'ohlifeElevenmoney',
  'ohlifeTwelvemoney']
  constructor(public http:HttpClient,public alertmsg: NzMessageService,public alertinfo:NzNotificationService) { 
    this.alldiary();
  }

  ngOnInit() {
  }

  alldiary(){
    this.http.post(this.stringurl+'api/Diary/count',{userid:localStorage.getItem("OhlifeID")}).subscribe((msg:any)=>{
      this.alldiarycount=msg;
    },(err:any)=>{
      console.log(err);
    })
  }
  //控制月数的增加
  addmonth(index:number){
    index==1?this.month-=1:this.month+=1
  }
  //当显示对话框时发起请求获取支付二维码
  showModal(): void {
    //this.openvip();
    // this.root = 'http://localhost:8888'; //remove 
    // this.corsHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '/' . // edit }); //this.contents = ''; 
    // var heade = new HttpHeaders()
    //     .append('Content-Type', 'application/json')
    //获取支付码的参数
    var fromdata={
      payTo: 'default',
      appId: 'XNXCBVCNXrg85D3A2D0DF153D588BB5C',
      goodsId: this.goodid[this.month-1],
      playerId: localStorage.getItem("OhlifeID")
    }
    //发起请求
    this.month>=1?this.http.post("/create/myPay/appid_create_order",fromdata
    ).subscribe((msg:any)=>{
      this.moneyzf=msg.orderInfo.qrcodeURL//获取字符生成二维码
      this.payment.orderId=msg.orderInfo.orderId;//获取订单编号
    },(err:any)=>{
      console.log(err)
    }):this.alertinfo.blank(
      '来自Oh Life',
      '请选择开通时长！'
    );
    this.isVisible = true;
  }
  //定义方法对订单进行查询
  handleOk(): void {
    this.http.post(
      "/create/myPay/is_pay_succ",this.payment
    ).subscribe((msgs:any)=>{
      console.log(msgs.msg)
      this.openvip();
    },(err:any)=>{
      console.log(err)
    })
    this.isVisible = false;
  }
  handleCancel(): void {
    console.log('456');
    this.isVisible = false;
  }
  updata()
  {
    if (this.oldpwd==this.newpwd) {
      this.http.post(this.stringurl+'api/Login/newpwd',{
        userid:localStorage.getItem("OhlifeID"),
        pwd:this.newpwd
      }).subscribe((msg:any)=>{
      if (msg=="Yes") {
        this.alertinfo.blank(
          '来自Oh Life',
          '密码修改完成.'
        );
      }else{
        this.alertinfo.blank(
          '来自Oh Life',
          '密码修改失败.'
        );
      }
      },(err:any)=>{
        console.log(err)
      })
    }
    else{
      this.alertinfo.blank(
        '来自Oh Life',
        '两次密码不一致.'
      );
    }
  }
  //开通vip
  openvip(){
 
    var month:number= (new Date()).getMonth()+1;
    var day:string= (new Date()).getDate().toString();
    var year:string= (new Date()).getFullYear().toString();
    var opentime:string=year+'/'+month.toString()+'/'+day;
    var overtime:string=year+'/'+(month+this.month).toString()+'/'+day;
    
    this.http.post(this.stringurl+'api/payment',{
      userid:localStorage.getItem("OhlifeID"),
      begintime:opentime,
      overtimes:overtime
    }).subscribe((msg:any)=>{
      if (msg=="Yes") {
        this.alertinfo.blank(
          '来自Oh Life',
          '开通成功,请退出重新登录.'
        );
      }
    },(err:any)=>{
      this.alertinfo.blank(
        '来自Oh Life',
        '开通失败，请联系客服.'
      );
    })
  }
}
