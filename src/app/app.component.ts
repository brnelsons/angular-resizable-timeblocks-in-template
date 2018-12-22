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

  sourceList: TargetWithTime[] = [
    {label: 'test', duration: 60},
    {label: 'test1', duration: 60},
    {label: 'test2', duration: 60},
    {label: 'test3', duration: 60},
    {label: 'test4', duration: 60}
  ];
  targetList: TargetWithTime[] = [];
  dropPreviewIndex = 0;

  drag(event: DragEvent, source: TargetWithTime, collectionName: string, removeFromCollection: boolean) {
    // event.preventDefault();
    event.dataTransfer.setData('sourceId', JSON.stringify(source));
    event.dataTransfer.setData('fromCollection', collectionName);
    event.dataTransfer.setData('removeFromCollection', removeFromCollection + '');
  }

  canDrop(event: DragEvent, targetList: TargetWithTime[]): boolean {
    event.preventDefault();
    const maxDuration = 24 * 60;
    let totalDuration = 0;
    targetList.forEach(t => {
      totalDuration += t.duration;
    });
    return totalDuration <= maxDuration;
  }

  drop(event: DragEvent) {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData('sourceId');
    const fromCollection = event.dataTransfer.getData('fromCollection');
    // if has room
    for (const source of this.sourceList) {
      if (sourceId !== source.label) {
        continue;
      }
      const newTarget = {
        label: source.label,
        duration: source.duration
      };
      if (this.dropPreviewIndex === -1) {
        this.targetList.push(newTarget);
      } else {
        this.targetList.splice(this.dropPreviewIndex, 0, newTarget);
      }
      this.dropPreviewIndex = -1;
      break;
    }
  }

  dropPreviewEnter(index: number) {
    this.dropPreviewIndex = index;
  }
}
