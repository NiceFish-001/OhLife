import { Component, OnInit,Input } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';
@Component({
  selector: 'app-papertwo',
  templateUrl: './papertwo.component.html',
  styleUrls: ['./papertwo.component.css']
})
export class PapertwoComponent implements OnInit {

 
  public diarytext:any;
  public strArr:any;
  constructor() { }

  ngOnInit() {
  }
  @Input()data:any;
  
  ngOnChanges(): void {
    this.diarytext=this.data[0].Diarycontent;
   this.strArr=this.data[0].Diarymedia.split(";");
  }

}
