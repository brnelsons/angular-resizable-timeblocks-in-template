import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CalendarBlockDirective} from './calendar-block.directive';
import {CalendarComponent} from './calendar/calendar.component';
import {DraggableDirective} from './directives/draggable.directive';
import {CalendarBlockComponent} from './calendar-block/calendar-block.component';
import {CalenderContainerDirective} from './calender-container.directive';
import {ContextMenuModule} from 'ngx-contextmenu';

@NgModule({
  declarations: [
    CalendarBlockDirective,
    CalendarComponent,
    DraggableDirective,
    CalendarBlockComponent,
    CalenderContainerDirective
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    ContextMenuModule.forRoot()
  ],
  exports: [
    CalendarBlockDirective,
    CalendarComponent,
    CalenderContainerDirective,
    DraggableDirective,
    ContextMenuModule
  ]
})
export class CalendarModule {
}
