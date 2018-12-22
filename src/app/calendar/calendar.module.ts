import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CalendarBlockDirective} from './calendar-block.directive';
import { CalendarComponent } from './calendar/calendar.component';
import { DraggableDirective } from './calendar/draggable.directive';

@NgModule({
  declarations: [
    CalendarBlockDirective,
    CalendarComponent,
    DraggableDirective
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
