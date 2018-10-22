import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tl-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input()
  checked: boolean;

  @Output()
  checkedChange: EventEmitter<boolean>;

  id: string;

  constructor() {
    this.checkedChange = new EventEmitter<boolean>();
    this.id =  'check-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
