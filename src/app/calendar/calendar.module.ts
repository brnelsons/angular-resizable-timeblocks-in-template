import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CalendarBlockDirective} from './calendar-block.directive';
import { CalendarComponent } from './calendar/calendar.component';
import { DraggableDirective } from './calendar-block/draggable.directive';
import { CalendarBlockComponent } from './calendar-block/calendar-block.component';

@NgModule({
  declarations: [
    CalendarBlockDirective,
    CalendarComponent,
    DraggableDirective,
    CalendarBlockComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  exports: [
    CalendarBlockDirective,
    CalendarComponent,
    DraggableDirective
  ]
})
export class CalendarModule {
}
