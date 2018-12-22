import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  height = 60;

  constructor() { }

  ngOnInit() {
  }

  dragUp(distance: number) {
    this.height += distance;
  }

  dragDown(distance: number) {
    this.height += -(distance);
  }
}
