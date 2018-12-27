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

  moveUp(data: CalendarBlockData) {
    this.sort();
    const index = this.templateBlocks.indexOf(data);
    if (index < 1) {
      return;
    }
    this.switchElementWithNext(index - 1);
  }

  moveDown(data: CalendarBlockData) {
    this.sort();
    const index = this.templateBlocks.indexOf(data);
    if (index === -1
      || index === this.templateBlocks.length - 1) {
      return;
    }
    this.switchElementWithNext(index);
  }

  remove(data: CalendarBlockData) {
    const index = this.templateBlocks.indexOf(data);
    if (index === -1) {
      return;
    }
    this.templateBlocks.splice(index, 1);
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
    if (template.end - template.start < this.duration) {
      // TODO emit event here for failure to add
      return;
    }
    this.templateBlocks.push(template);
  }

  private sort() {
    this.templateBlocks.sort((a, b) => {
      return a.start > b.start ? 1 : -1;
    });
  }

  private switchElementWithNext(index) {
    const splicedBlocks = this.templateBlocks.splice(index, 2);

    const above = splicedBlocks[0];
    const below = splicedBlocks[1];

    const aboveStart = above.start;
    const aboveEnd = above.end;

    const belowStart = below.start;
    const belowEnd = below.end;

    below.start = above.start;
    below.end = below.start + (belowEnd - belowStart);

    above.start = below.end;
    above.end = above.start + (aboveEnd - aboveStart);

    setTimeout(() => {
      this.templateBlocks.push(below);
      this.templateBlocks.push(above);
    });
  }
}
