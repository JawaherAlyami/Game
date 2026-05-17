

import { Component } from '@angular/core';
import { LeaderboardComponent } from '../../../component/game/leaderboard.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, LeaderboardComponent],
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}