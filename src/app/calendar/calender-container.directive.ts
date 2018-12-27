import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appCalenderContainer]'
})
export class CalenderContainerDirective implements OnInit {

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.position = 'relative';
  }

  getHeight(): number {
    return this.elementRef.nativeElement.offsetHeight;
  }

}
