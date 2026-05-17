
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-sheet',
  template: `
    <div *ngIf="open">
      <div
        class="fixed inset-0 z-40 bg-black/80"
        (click)="closeSheet()"
      ></div>

      <div
        class="fixed top-0 right-0 z-50 h-full w-3/4 max-w-sm bg-white p-6 shadow-lg transition-transform"
      >
        <button
          class="absolute right-4 top-4"
          (click)="closeSheet()"
        >
          ✕
        </button>

        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class SheetComponent {
  @Input() open = false;

  @Output() openChange = new EventEmitter<boolean>();

  closeSheet() {
    this.open = false;
    this.openChange.emit(false);
  }
}