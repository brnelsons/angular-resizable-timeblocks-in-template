import {Component, Host, HostListener, Input, OnInit} from '@angular/core';
import {CalenderContainerDirective} from '../calender-container.directive';

export interface CalendarBlockData {
  start: number;
  end: number;
  title: string;
}

export type CalendarRangePredicate = (rangeMin: number, rangeMax: number, data: CalendarBlockData) => boolean;


@Component({
  selector: 'app-calendar-block',
  templateUrl: './calendar-block.component.html',
  styleUrls: ['./calendar-block.component.css']
})
export class CalendarBlockComponent implements OnInit {

  @Input() data: CalendarBlockData;
  @Input() max = 1440;
  @Input() validateRange: CalendarRangePredicate;

  top = 0;
  height = 0;
  scale: number;

  constructor(@Host() private parent: CalenderContainerDirective) {
  }

  ngOnInit() {
    this.height = this.calculateHeight(this.data);
    this.top = this.calculateTop(this.data);
    this.scale = this.calculateScale();
  }

  dragAll(distance: number) {
    const scaledDistance = distance * this.scale;
    const rangeStart = Math.floor(this.data.start - scaledDistance);
    const rangeEnd = Math.floor(this.data.end - scaledDistance);
    // validation
    if (!this.isValid(rangeStart, rangeEnd)) {
      // TODO get as close as possible
      return;
    }
    this.data.start = rangeStart;
    this.data.end = rangeEnd;
    this.top = this.calculateTop(this.data);
  }

  private isValid(rangeStart, rangeEnd) {
    return rangeStart >= 0 && rangeEnd <= 1440 && this.validateRange && this.validateRange(rangeStart, rangeEnd, this.data);
  }

  dragUp(distance: number) {
    const rangeStart = Math.floor(this.data.start - distance * this.scale);
    if (!this.isValid(rangeStart, this.data.end)) {
      // TODO get as close as possible
      return;
    }
    this.data.start = rangeStart;
    this.height = this.calculateHeight(this.data);
    this.top = this.calculateTop(this.data);
  }

  dragDown(distance: number) {
    const rangeEnd = Math.floor(this.data.end - distance * this.scale);
    if (!this.isValid(this.data.start, rangeEnd)) {
      // TODO get as close as possible
      return;
    }
    this.data.end = rangeEnd;
    this.height = this.calculateHeight(this.data);
  }

  convertUnitsToPct(val: number, max: number) {
    return val / max * 100;
  }

  calculateTop(data: CalendarBlockData): number {
    if (!data) {
      return;
    }
    return this.convertUnitsToPct(data.start, this.max);
  }

  calculateHeight(data: CalendarBlockData): number {
    if (!data) {
      return;
    }
    return this.convertUnitsToPct(data.end - data.start, this.max);
  }

  calculateScale(): number {
    return this.max / this.parent.getHeight();
  }

  @HostListener('window:resize')
  onResize() {
    this.scale = this.calculateScale();
  }
}
