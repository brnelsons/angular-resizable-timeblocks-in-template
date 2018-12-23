import {Component, HostListener, Input, OnInit} from '@angular/core';
import {CalendarBlockData, CalendarRangePredicate} from '../calendar-block/calendar-block.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input() blocks: CalendarBlockData[] = [];
  @Input() duration = 120;
  templateBlocks: CalendarBlockData[] = [];
  previewBlock: CalendarBlockData;
  maxLength = 1440;

  rangeValidator: CalendarRangePredicate = ((rangeMin, rangeMax, data) => {
    for (const block of this.templateBlocks) {
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
    this.blocks.forEach(b => {
      this.templateBlocks.push(b);
    });
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    // show preview
  }

  @HostListener('drop', ['$event'])
  dropTemplate(event: DragEvent) {
    event.preventDefault();
    const templateString = event.dataTransfer.getData('template');
    if (templateString === '') {
      return;
    }
    const template: CalendarBlockData = JSON.parse(templateString);
    let lastEnd = 0;
    this.templateBlocks.forEach(tb => {
      if (tb.end > lastEnd) {
        lastEnd = tb.end;
      }
    });
    template.start = lastEnd;
    template.end = Math.min(template.start + this.duration, 1440);

    this.templateBlocks.push(template);
  }
}
