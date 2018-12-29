import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CalendarBlockDirective} from './calendar-block.directive';
import {CalendarComponent} from './calendar/calendar.component';
import {CalendarBlockComponent} from './calendar-block/calendar-block.component';
import {CalenderContainerDirective} from './calender-container.directive';
import {ContextMenuModule} from 'ngx-contextmenu';
import {DragHandleModule} from '../../../projects/drag-handle/src/lib/drag-handle.module';

@NgModule({
  declarations: [
    CalendarBlockDirective,
    CalendarComponent,
    CalendarBlockComponent,
    CalenderContainerDirective
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    DragHandleModule,
    ContextMenuModule.forRoot()
  ],
  exports: [
    CalendarBlockDirective,
    CalendarComponent,
    CalenderContainerDirective,
    DragHandleModule,
    ContextMenuModule
  ]
})
export class CalendarModule {
}
