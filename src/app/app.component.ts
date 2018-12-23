import {Component} from '@angular/core';
import {CalendarBlockData} from './calendar/calendar-block/calendar-block.component';
import {green, orange, red} from '@material-ui/core/colors';

export class DayTemplate {
  title: string;
  blocks: CalendarBlockData[] = [];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  days: DayTemplate[] = [
    {title: 'Sunday', blocks: []},
    {title: 'Monday', blocks: []},
    {title: 'Tuesday', blocks: []},
    {title: 'Wednesday', blocks: []},
    {title: 'Thursday', blocks: []},
    {title: 'Friday', blocks: []},
    {title: 'Saturday', blocks: []},
  ];

  templates: CalendarBlockData[] = [
    {start: 0, end: 60, title: '1', color: green[300]},
    {start: 0, end: 60, title: '2', color: red[300]},
    {start: 0, end: 60, title: '3', color: orange[300]}
  ];

  dragTemplate(event: DragEvent, blockData: CalendarBlockData) {
    event.dataTransfer.setData('template', JSON.stringify(blockData));
  }
}
