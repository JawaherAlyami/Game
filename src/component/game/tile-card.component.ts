

import { Component, Input } from '@angular/core';
import { Tile } from '../../models/game.models';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-tile-card',
  templateUrl: './tile-card.component.html',
})
export class TileCardComponent {
  @Input() tile!: Tile;

  @Input() value = 0;

  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Input() highlight: 'win' | 'loss' | 'danger' | null = null;

  @Input() showValue = true;

  sizeClasses: Record<string, string> = {
    sm: 'w-12 h-16 text-3xl rounded-md',
    md: 'w-20 h-28 text-6xl rounded-xl',
    lg: 'w-24 h-32 text-7xl rounded-xl',
  };

  get ringClass(): string {
    switch (this.highlight) {
      case 'win':
        return 'ring-2 ring-gold';
      case 'loss':
        return 'ring-2 ring-cinnabar/70';
      case 'danger':
        return 'ring-2 ring-cinnabar animate-pulse';
      default:
        return 'ring-1 ring-bone/40';
    }
  }

  glyphColor(): string {
    if (this.tile.kind.category === 'number') {
      const suitMap: Record<string, string> = {
        bamboo: 'text-jade',
        characters: 'text-ink',
        dots: 'text-lapis',
      };

      return suitMap[this.tile.kind.suit];
    }

    if (this.tile.kind.category === 'dragon') {
      const dragonMap: Record<string, string> = {
        red: 'text-cinnabar',
        green: 'text-jade',
        white: 'text-ink/70',
      };

      return dragonMap[this.tile.kind.dragon];
    }

    return 'text-ink';
  }
}