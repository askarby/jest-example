import { Component, Input, OnInit } from '@angular/core';
import { TodoListItem } from '../todo-list-item.model';

const COLORS = {
  green: '#5AA454',
  red: '#A10A28',
  yellow: '#C7B42C',
};

@Component({
  selector: 'tl-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  @Input()
  set items(items: TodoListItem[]) {
    // Split up in two pools (completed and uncompleted)
    let completed = 0;
    let uncompleted = 0;
    items.forEach(item => {
      if (item.isCompleted) {
        completed++;
      } else {
        uncompleted++;
      }
    });

    // Push data (to Pie chart)
    this.data = [
      {
        name: 'Completed',
        value: completed,
      },
      {
        name: 'Uncompleted',
        value: uncompleted,
      }
    ];
  }

  data: { name: string, value: number }[] = [];

  view: number[] = [700, 400];

  colorScheme = {
    domain: [COLORS.green, COLORS.red]
  };
}
