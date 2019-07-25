import {Pipe, PipeTransform } from '@angular/core'

@Pipe({
name:'totext'
})
export class TodtextPipe implements PipeTransform{
    transform(value:string):any{
        var textarry= value.match(/[\u4e00-\u9fa5]+/g)
        var returnvalue:string="";
        for (let index = 0; index < textarry.length; index++){
           returnvalue=textarry[index]+returnvalue;
        }
        return returnvalue.substring(0,15)+"......"
    }
}