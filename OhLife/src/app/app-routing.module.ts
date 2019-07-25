import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {LifemainComponent} from './lifemain/lifemain.component';

import {TextComponent} from './edit/text/text.component';
import {PictureComponent} from './edit/picture/picture.component';

import {AudioComponent} from './edit/audio/audio.component';
import {AlldiaryComponent} from './edit/alldiary/alldiary.component';
import {AlldiaryaudioComponent} from './edit/alldiaryaudio/alldiaryaudio.component';
import {AlldiarypictureComponent} from './edit/alldiarypicture/alldiarypicture.component';
import {SetupComponent} from '../app/edit/setup/setup.component'
import {RegisterComponent} from '../app/register/register.component'

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'loginpage',component:LoginComponent},
  {path:'registerpage',component:RegisterComponent},
  {path:'lifemainpage',component:LifemainComponent,children:[
    {path:'',component:AlldiaryComponent,outlet:'Sonroute'},
    {path:'setuppage',component:SetupComponent,outlet:'Sonroute'},
    {path:'textpage',component:TextComponent,outlet:'Sonroute'},
    {path:'picturepage',component:PictureComponent,outlet:'Sonroute'},
    {path:'Audiopage',component:AudioComponent,outlet:'Sonroute'},
    {path:'Alldiarypage',component:AlldiaryComponent,outlet:'Sonroute'},
    {path:'Alldiaryaudiopage',component:AlldiaryaudioComponent,outlet:'Sonroute'},
    {path:'Alldiarypicturepage',component:AlldiarypictureComponent,outlet:'Sonroute'},
    
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
