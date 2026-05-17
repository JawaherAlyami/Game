

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-deck-status',
  templateUrl: './deck-status.component.html',
})
export class DeckStatusComponent {
  @Input() draw = 0;
  @Input() discard = 0;
  @Input() reshuffles = 0;
  @Input() maxReshuffles = 0;
}