import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

export type GrabType = 'row-resize' | 'col-resize' | 'n-resize' | 's-resize' | 'move' | 'grab';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {
  private dragging = false;
  private originY: number;
  private lastY: number;

  @Input() grabType: GrabType;
  @Input() restrict = true;
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

    const distance = this.lastY - newY;
    const positive = distance > 0;
    if (this.restrict) {
      if (positive) {
        if (this.elementRef.nativeElement.getBoundingClientRect().bottom < event.clientY) {
          this.lastY = newY;
          return;
        }
      } else {
        if (this.elementRef.nativeElement.getBoundingClientRect().top > event.clientY) {
          this.lastY = newY;
          return;
        }
      }
    }
    // trick to ensure we get as close as possible
    // for (let i = 0; i <= Math.abs(distance); i++) {
    //   this.drag.emit(positive ? 1 : -1);
    // }
    this.drag.emit(distance);
    this.lastY = newY;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    document.body.style.cursor = this.grabType + ' !important';
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
    document.body.style.cursor = '';
  }

}
