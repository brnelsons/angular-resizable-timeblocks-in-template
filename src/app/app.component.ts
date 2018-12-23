import {Component} from '@angular/core';

export class TargetWithTime {
  label: string;
  duration: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  days = [
    {title: 'Sunday'},
    {title: 'Monday'},
    {title: 'Tuesday'},
    {title: 'Wednesday'},
    {title: 'Thursday'},
    {title: 'Friday'},
    {title: 'Saturday'},
  ];
}
