//angular默认配置
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
//ng-zorro配置
import { NgZorroAntdModule, NZ_I18N, en_US, zh_CN } from 'ng-zorro-antd';//国际化配置
//富文本框配置
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh'
import { AppRoutingModule } from './app-routing.module';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular'
//引入生成二维码模块
import {QRCodeModule} from 'angular2-qrcode'
//自定义管道
import {TodatePipe} from './filter/datefilter'//自定义时间管道
import {TodtextPipe} from './filter/textfilter'//自定义文字限制管道
//引入创建组件
import { LoginComponent } from './login/login.component';
import { LifemainComponent } from './lifemain/lifemain.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EmptyComponent } from './edit/empty/empty.component';
import { TextComponent } from './edit/text/text.component';
import { PictureComponent } from './edit/picture/picture.component';
import { AudioComponent } from './edit/audio/audio.component';
import { AlldiaryComponent } from './edit/alldiary/alldiary.component';
import { PaperoneComponent } from './container/paperone/paperone.component';
import { PapertwoComponent } from './container/papertwo/papertwo.component';
import { PaperthreeComponent } from './container/paperthree/paperthree.component';
import { AlldiaryaudioComponent } from './edit/alldiaryaudio/alldiaryaudio.component';
import { AlldiarypictureComponent } from './edit/alldiarypicture/alldiarypicture.component';
import { SetupComponent } from './edit/setup/setup.component';
import { RegisterComponent } from './register/register.component';


registerLocaleData(zh);//配置中文

@NgModule({
  declarations: [
    TodatePipe,
    TodtextPipe,
    AppComponent,
    //QRCodeModule,//引入QRCodeModule模板
    LoginComponent,
    LifemainComponent,
    CalendarComponent,
    EmptyComponent,
    TextComponent,
    PictureComponent,
    AudioComponent,
    AlldiaryComponent,
    PaperoneComponent,
    PapertwoComponent,
    PaperthreeComponent,
    AlldiaryaudioComponent,
    AlldiarypictureComponent,
    SetupComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    CKEditorModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    QRCodeModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
