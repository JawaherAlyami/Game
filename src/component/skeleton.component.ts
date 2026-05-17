
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-skeleton',
  template: `
    <div [ngClass]="classes"></div>
  `,
})
export class SkeletonComponent {
  @Input() classes =
    'animate-pulse rounded-md bg-primary/10';
}