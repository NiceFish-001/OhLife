import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-paperone',
  templateUrl: './paperone.component.html',
  styleUrls: ['./paperone.component.css']
})
export class PaperoneComponent implements OnInit {

  public diarytext:any;
  constructor() { }

  ngOnInit() {
  }
  @Input()data:any;
  
  ngOnChanges(): void {
    this.diarytext=this.data[0].Diarycontent;
  }

}
