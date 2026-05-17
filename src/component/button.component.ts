
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-button',
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [ngClass]="classes"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link' = 'default';

  @Input() size: 'default' | 'sm' | 'lg' | 'icon' = 'default';

  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Input() disabled = false;

  get classes(): string {
    const base =
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none disabled:opacity-50';

    const variants = {
      default: 'bg-primary text-white hover:bg-primary/90',
      destructive: 'bg-red-500 text-white hover:bg-red-600',
      outline:
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    };

    const sizes = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-10 px-8',
      icon: 'h-9 w-9',
    };

    return `${base} ${variants[this.variant]} ${sizes[this.size]}`;
  }
}