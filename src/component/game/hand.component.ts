import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { TileCardComponent } from './tile-card.component';

@Component({
  selector: 'app-hand',
  standalone: true,
  imports: [
    CommonModule,
    TileCardComponent
  ],
  templateUrl: './hand.component.html',
})
export class HandComponent {
  @Input() hand: any[] = [];
  @Input() total = 0;
  @Input() dangerTileId: string | null = null;

  tileValue(tile: any) {
    return tile?.value ?? 0;
  }
}