import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

export type GrabType = 'row-resize' | 'col-resize' | 'n-resize' | 's-resize' | 'move' | 'grab';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit{
  private dragging = false;
  private originY: number;
  private lastY: number;

  @Input() grabType: GrabType;
  @Output() drag = new EventEmitter<number>();

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.cursor = this.grabType;
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
    this.drag.emit(this.lastY - newY);
    this.lastY = newY;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    this.dragging = true;
    this.originY = event.clientY;
    this.lastY = this.originY;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (event.button !== 0) {
      return;
    }
    this.dragging = false;
  }

}
