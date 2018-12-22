import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  private dragging = false;
  private originY: number;
  private lastY: number;

  @Output() onDrag = new EventEmitter<number>();

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.dragging) {
      return;
    }
    event.preventDefault();
    const newY = event.clientY;
    // if (newY > this.originY && this.lastY - newY > 0) {
    //   console.log('cant move any more');
    //   return;
    // }
    this.onDrag.emit(this.lastY - newY);
    this.lastY = newY;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.dragging = true;
    this.originY = event.clientY;
    this.lastY = this.originY;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.dragging = false;
  }

}
