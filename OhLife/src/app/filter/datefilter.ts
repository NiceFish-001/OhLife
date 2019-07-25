import {Pipe, PipeTransform } from '@angular/core'

@Pipe({
name:'todate'
})
export class TodatePipe implements PipeTransform{
    transform(value:string):any{
        return new Date(parseInt(value.substr(6, 13))).toLocaleDateString();
    }
}
// import {Pipe, PipeTransform } from '@angular/core'
// @Pipe({
//   name: 'strLength'
// })
// export class StrLengthPipe implements PipeTransform{
//   transform(value: string, args?: any): any {
//     return value + "----" + "huangbiao";
//   }
// }
