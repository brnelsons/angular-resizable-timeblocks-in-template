import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

export type GrabType = 'row-resize' | 'col-resize' | 'n-resize' | 's-resize' | 'move' | 'grab';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {
  private dragging = false;
  private lastMouseY: number;

  @Input() grabType: GrabType;
  @Input() restrict = true;
  @Input() snapLength = 15;
  @Input() scale = 1;
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
    const mouseY = event.clientY;

    const distancePx = this.lastMouseY - mouseY;
    const snapLengthPx = this.snapLength / this.scale;
    const positive = distancePx > 0;
    if (this.restrict) {
      if (positive) {
        if (this.elementRef.nativeElement.getBoundingClientRect().bottom < mouseY) {
          this.lastMouseY = mouseY;
          return;
        }
      } else {
        if (this.elementRef.nativeElement.getBoundingClientRect().top > mouseY) {
          this.lastMouseY = mouseY;
          return;
        }
      }
    }
    if (Math.abs(distancePx) >= snapLengthPx) {
      console.log(distancePx, snapLengthPx);
      let i = 0;
      // emit a single move event for each snapLength we travelled
      while (i < Math.floor(Math.abs(distancePx / snapLengthPx))) {
        const value = (positive ? 1 : -1) * this.snapLength;
        this.drag.emit(value);
        i++;
      }
      // add the remainder of unsused distance traveled so we don't get weird travel issues
      this.lastMouseY = mouseY + (distancePx % snapLengthPx);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    document.body.style.cursor = this.grabType + ' !important';
    this.dragging = true;
    this.lastMouseY = event.clientY;
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
