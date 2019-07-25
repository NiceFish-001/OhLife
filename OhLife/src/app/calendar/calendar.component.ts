import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public diarytime:string;
  
  constructor() { }

  onValueChange(value:Date){
    //console.log(value.getFullYear())
    this.diarytime=this.formatDate(value);
  }

   formatDate = function (date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;   
    return y + '-' + m + '-' + d;  
};


  ngOnInit() {
  }



}
