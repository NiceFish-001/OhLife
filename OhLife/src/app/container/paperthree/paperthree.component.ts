import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-paperthree',
  templateUrl: './paperthree.component.html',
  styleUrls: ['./paperthree.component.css']
})
export class PaperthreeComponent implements OnInit {

  public diarytext:any;
  public strArr:any;
  constructor() { }

  ngOnInit() {
  }
  @Input()data:any;
  
  ngOnChanges(): void {
    console.log(this.data[0].Diarycontent)
    console.log(this.data[0].Diarymedia);
    this.diarytext=this.data[0].Diarycontent;
   this.strArr='http://localhost:52233/audio/'+this.data[0].Diarymedia+'.mp3';
  }

}
