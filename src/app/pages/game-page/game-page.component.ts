import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import { HandBettingGameService } from '../../services/hand-betting-game.service';
import { NgZone } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './game-page.component.html',
})
export class GamePageComponent {
  name = '';

  constructor(public game: HandBettingGameService, private ngZone: NgZone,  private router: Router) {}

  get state() {
    return this.game.state;
  }

  get currentTotal() {
    return this.game.currentTotal;
  }

  get config() {
    return this.game.config;
  }

  get lastRound() {
    return this.state.history?.[0] ?? null;
  }

  get isOver() {
    return this.state.status === 'over';
  }

  get canQualify() {
    return this.state.score > 0;
  }

  bet(direction: 'higher' | 'lower') {
    this.ngZone.run(() => {
      console.log('test', direction);
      this.game.bet(direction);
    });
  }

  handleNewGame() {
    this.game.reset();
  }

  saveScore() {
    console.log("test")
    this.game.saveLeaderboard(this.name);
    this.router.navigate(['/']); 
  }

}