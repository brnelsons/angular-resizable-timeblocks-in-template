import {Component, Host, Input, OnInit} from '@angular/core';
import {CalenderContainerDirective} from '../calender-container.directive';

export interface CalendarBlockData {
  start: number;
  end: number;
  title: string;
}

@Component({
  selector: 'app-calendar-block',
  templateUrl: './calendar-block.component.html',
  styleUrls: ['./calendar-block.component.css']
})
export class CalendarBlockComponent implements OnInit {


  @Input() data: CalendarBlockData;
  @Input() max = 1440;
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
    // validation
    this.data.start -= distance * this.scale;
    this.data.end -= distance * this.scale;
    this.top = this.calculateTop(this.data);
  }

  dragUp(distance: number) {
    this.data.start -= distance * this.scale;
    this.height = this.calculateHeight(this.data);
    this.top = this.calculateTop(this.data);
  }

  dragDown(distance: number) {
    this.data.end -= distance * this.scale;
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
}
