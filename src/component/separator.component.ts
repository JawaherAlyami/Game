
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-separator',
  template: `
    <div [ngClass]="separatorClass"></div>
  `,
})
export class SeparatorComponent {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';

  get separatorClass(): string {
    return this.orientation === 'horizontal'
      ? 'h-px w-full bg-border'
      : 'w-px h-full bg-border';
  }
}