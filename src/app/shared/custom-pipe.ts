import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name:'elipses'
})
export class customPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        return value.toLowerCase();
    } 

}