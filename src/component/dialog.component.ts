
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-dialog',
  template: `
    <div
      *ngIf="open"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="fixed inset-0 bg-black/80"
        (click)="closeDialog()"
      ></div>

      <div
        class="relative z-50 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg"
      >
        <button
          class="absolute right-4 top-4"
          (click)="closeDialog()"
        >
          ✕
        </button>

        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class DialogComponent {
  @Input() open = false;

  @Output() openChange = new EventEmitter<boolean>();

  closeDialog() {
    this.open = false;
    this.openChange.emit(false);
  }
}