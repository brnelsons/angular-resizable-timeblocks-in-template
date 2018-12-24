import {Component, Host, HostListener, Input, OnInit} from '@angular/core';
import {CalenderContainerDirective} from '../calender-container.directive';
import * as moment from 'moment';

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

  printDateRange(data: CalendarBlockData): string {
    const startMinute = Math.floor(data.start % 60);
    const startHour = Math.floor(data.start / 60);
    const endMinute = Math.floor(data.end % 60);
    const endHour = Math.floor(data.end / 60);
    return moment(`${startHour}${startMinute}`, 'HHmm').format('HH:mm')
      + moment(`${endHour}${endMinute}`, 'HHmm').format('HH:mm');
  }

  dragAll(distance: number) {
    console.log(distance);
    const rangeStart = this.data.start - distance;
    const rangeEnd = this.data.end - distance;
    // validation
    if (!this.isValid(rangeStart, rangeEnd)) {
      return;
    }
    this.data.start = rangeStart;
    this.data.end = rangeEnd;
    this.top = this.calculateTop(this.data);
  }

  dragTop(distance: number) {
    console.log(distance);
    const rangeStart = this.data.start - distance;
    if (!this.isValid(rangeStart, this.data.end)) {
      return;
    }
    this.data.start = rangeStart;
    this.height = this.calculateHeight(this.data);
    this.top = this.calculateTop(this.data);
  }

  dragBottom(distance: number) {
    console.log(distance);
    const rangeEnd = this.data.end - distance;
    if (!this.isValid(this.data.start, rangeEnd)) {
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
