import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appCalenderContainer]'
})
export class CalenderContainerDirective {

  constructor(private elementRef: ElementRef) {
  }

  getHeight(): number {
    return this.elementRef.nativeElement.offsetHeight;
  }

}
