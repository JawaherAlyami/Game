
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-label',
  template: `
    <label [ngClass]="classes">
      <ng-content></ng-content>
    </label>
  `,
})
export class LabelComponent {
  @Input() classes =
    'text-sm font-medium leading-none';
}