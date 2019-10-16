import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirector {
    constructor(public viewContainerRef: ViewContainerRef) {

     }
}
