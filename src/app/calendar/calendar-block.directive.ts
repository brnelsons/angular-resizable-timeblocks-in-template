import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appCalendarBlock]'
})
export class CalendarBlockDirective {

  @Input() appCalendarBlock: string;
  posTop: number;
  posBottom: number;

  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.style.position = 'absolute';
    elementRef.nativeElement.style.display = 'block';
    elementRef.nativeElement.draggable = 'true';
    this.posTop = elementRef.nativeElement.offsetTop;
    this.posBottom = elementRef.nativeElement.offsetTop + elementRef.nativeElement.offsetHeight;
  }

  @HostListener('document:mousedown', ['$event'])
  onDrag(event: DragEvent) {
    event.preventDefault();
  }

}
