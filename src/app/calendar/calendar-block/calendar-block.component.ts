import {Component, Host, HostListener, Input, OnInit} from '@angular/core';
import {CalenderContainerDirective} from '../calender-container.directive';

export interface CalendarBlockData {
  start: number;
  end: number;
  title: string;
  color: string;
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
  @Input() minInterval = 15;
  @Input() snapSize = 15;
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
    const rangeStart = this.data.start - scaledDistance;
    const rangeEnd = this.data.end - scaledDistance;
    // validation
    if (!this.isValid(rangeStart, rangeEnd)) {
      // get as close as possible
      let i = 0;
      const direction = distance > 0 ? 1 : -1;
      while (this.isValid(this.data.start - direction, this.data.end - direction) && i <= Math.abs(distance)) {
        i++;
        this.data.start = this.data.start - direction;
        this.data.end = this.data.end - direction;
        this.top = this.calculateTop(this.data);
      }
      return;
    }
    this.data.start = Math.floor(rangeStart);
    this.data.end = Math.floor(rangeEnd);
    this.top = this.calculateTop(this.data);
  }

  dragTop(distance: number) {
    const rangeStart = Math.floor(this.data.start - distance * this.scale);
    if (!this.isValid(rangeStart, this.data.end)) {
      // get as close as possible
      let i = 0;
      const direction = distance > 0 ? 1 : -1;
      while (this.isValid(this.data.start - direction, this.data.end) && i <= Math.abs(distance)) {
        i++;
        this.data.start = this.data.start - direction;
        this.height = this.calculateHeight(this.data);
        this.top = this.calculateTop(this.data);
      }
      return;
    }
    this.data.start = rangeStart;
    this.height = this.calculateHeight(this.data);
    this.top = this.calculateTop(this.data);
  }

  dragBottom(distance: number) {
    const rangeEnd = Math.floor(this.data.end - distance * this.scale);
    if (!this.isValid(this.data.start, rangeEnd)) {
      // get as close as possible
      let i = 0;
      const direction = distance > 0 ? 1 : -1;
      while (this.isValid(this.data.start, this.data.end - direction) && i <= Math.abs(distance)) {
        i++;
        this.data.end = this.data.end - direction;
        this.height = this.calculateHeight(this.data);
      }
      return;
    }
    this.data.end = rangeEnd;
    this.height = this.calculateHeight(this.data);
  }

  private isValid(rangeStart, rangeEnd): boolean {
    return rangeEnd - rangeStart > this.minInterval
      && rangeStart >= 0
      && rangeEnd <= this.max
      && this.validateRange
      && this.validateRange(rangeStart, rangeEnd, this.data);
  }

  private convertUnitsToPct(val: number, max: number) {
    return val / max * 100;
  }

  private calculateTop(data: CalendarBlockData): number {
    if (!data) {
      return;
    }
    return this.convertUnitsToPct(data.start, this.max);
  }

  private calculateHeight(data: CalendarBlockData): number {
    if (!data) {
      return;
    }
    return this.convertUnitsToPct(data.end - data.start, this.max);
  }

  private calculateScale(): number {
    return this.max / this.parent.getHeight();
  }

  @HostListener('window:resize')
  onResize() {
    this.scale = this.calculateScale();
  }
}
