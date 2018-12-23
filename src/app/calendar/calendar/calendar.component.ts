import {Component, OnInit} from '@angular/core';
import {CalendarBlockData, CalendarRangePredicate} from '../calendar-block/calendar-block.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  blocks: CalendarBlockData[] = [
    {start: 0, end: 60, title: '1'},
    {start: 60, end: 120, title: '2'},
    {start: 240, end: 300, title: '3'}
  ];

  rangeValidator: CalendarRangePredicate = ((rangeMin, rangeMax, data) => {
    for (const block of this.blocks) {
      if (block === data) {
        continue;
      }
      if (rangeMin > block.start && rangeMin < block.end
        || rangeMax > block.start && rangeMax < block.end) {
        return false;
      }
    }
    return true;
  });

  constructor() {
  }

  ngOnInit() {
  }

}
