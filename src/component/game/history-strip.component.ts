

import { Component, Input } from '@angular/core';
import { RoundRecord } from '../../models/game.models';
import { CommonModule } from '@angular/common';
import { TileCardComponent } from './tile-card.component';
@Component({
  standalone: true,
  imports: [CommonModule, TileCardComponent],
  selector: 'app-history-strip',
  templateUrl: './history-strip.component.html',
})
export class HistoryStripComponent {
  @Input() history: RoundRecord[] = [];

  resultBadge: Record<string, string> = {
    win: 'bg-gold/15 text-gold border-gold/40',
    loss: 'bg-cinnabar/15 text-cinnabar border-cinnabar/40',
    push: 'bg-bone/10 text-bone/70 border-bone/30',
  };
}