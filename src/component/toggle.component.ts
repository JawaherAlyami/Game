
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-toggle',
  template: `
    <button
      type="button"
      (click)="toggle()"
      [ngClass]="classes"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ToggleComponent {
  @Input() active = false;

  @Output() activeChange = new EventEmitter<boolean>();

  toggle() {
    this.active = !this.active;
    this.activeChange.emit(this.active);
  }

  get classes(): string {
    return `
      inline-flex items-center justify-center rounded-md px-3 py-2 text-sm
      transition-colors
      ${this.active ? 'bg-accent text-accent-foreground' : 'bg-transparent'}
    `;
  }
}