import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

/**
 * CSS Cursor while dragging or hovering over the element.
 */
export type HandleType = string | 'row-resize' | 'col-resize' | 'n-resize' | 's-resize' | 'move' | 'grab';

/**
 * Mouse button for drag.
 */
export enum HandleButton {
  left = 0,
  right = 1,
  middle = 2
}

/**
 * Directive to enable dragging events for a specific component.
 */
@Directive({
  selector: '[drgHandle]'
})
export class DragHandleDirective implements OnInit {

  /**
   * The type of cursor.
   */
  @Input() drgHandle: HandleType = 'grab';
  /**
   * The scale at which to snap and output.
   */
  @Input() drgScale = 1;
  /**
   * Restrict the positive events when the cursor is below the element and vice-versa.
   */
  @Input() drgRestrict = true;
  /**
   * Limits event output to when scaled distance traveled exceeds snap size.
   */
  @Input() drgSnapSize = 1;
  /**
   * Button to drag with.
   */
  @Input() drgButton: HandleButton = HandleButton.left;
  /**
   * Event output when drag event has occurred.
   */
  @Output() drgDrag = new EventEmitter<number>();

  /**
   * If we are currently dragging.
   */
  private isDragging = false;
  /**
   * Previous mouse position for comparison.
   */
  private previousMouseY: number;
  /**
   * the default cursor to fall back to when we are no longer dragging.
   */
  private defaultHandle: string;

  constructor(private elementRef: ElementRef) {
  }

  /**
   * Setup the cursor for the element for hover.
   * Capture the default body cursor.
   */
  ngOnInit(): void {
    this.elementRef.nativeElement.style.cursor = this.drgHandle;
    this.defaultHandle = document.body.style.cursor;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (event.button !== this.drgButton as number) {
      return;
    }
    event.preventDefault();
    document.body.style.cursor = this.drgHandle;
    this.isDragging = true;
    this.previousMouseY = event.clientY;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (event.button !== this.drgButton as number && !this.isDragging) {
      return;
    }
    this.isDragging = false;
    document.body.style.cursor = this.defaultHandle;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) {
      return;
    }
    event.preventDefault();
    const mouseY = event.clientY;

    const distancePx = this.previousMouseY - mouseY;
    const snapLengthPx = this.drgSnapSize / this.drgScale;
    const positive = distancePx > 0;
    if (this.drgRestrict) {
      if (positive) {
        if (this.elementRef.nativeElement.getBoundingClientRect().bottom < mouseY) {
          this.previousMouseY = mouseY;
          return;
        }
      } else {
        if (this.elementRef.nativeElement.getBoundingClientRect().top > mouseY) {
          this.previousMouseY = mouseY;
          return;
        }
      }
    }
    if (Math.abs(distancePx) >= snapLengthPx) {
      let i = 0;
      // emit a single move event for each snapLength we travelled
      while (i < Math.floor(Math.abs(distancePx / snapLengthPx))) {
        const value = (positive ? 1 : -1) * this.drgSnapSize;
        this.drgDrag.emit(value);
        i++;
      }
      // add the remainder of unsused distance traveled so we don't get weird travel issues
      this.previousMouseY = mouseY + (distancePx % snapLengthPx);
    }
  }
}
