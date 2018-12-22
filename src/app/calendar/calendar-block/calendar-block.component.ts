import {Component, Input, OnInit} from '@angular/core';

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
  height = 0;

  constructor() {
  }

  ngOnInit() {
    this.height = this.calculateHeight(this.data);
  }

  dragAll(distance: number) {
    this.data.start -= distance;
    this.data.end -= distance;
    this.height = this.calculateHeight(this.data);
  }

  dragUp(distance: number) {
    this.data.start -= distance;
    this.height = this.calculateHeight(this.data);
  }

  dragDown(distance: number) {
    this.data.end += -(distance);
    this.height = this.calculateHeight(this.data);
  }

  convertUnitsToPct(val: number, max: number) {
    return val / max * 100;
  }

  calculateHeight(data: CalendarBlockData): number {
    if (!data) {
      return;
    }
    return this.convertUnitsToPct(data.end - data.start, this.max);
  }
}
