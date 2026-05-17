import { Component, Input, OnChanges, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LeaderboardEntry } from '../../models/game.models';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
})
export class LeaderboardComponent implements OnInit, OnChanges {
  @Input() refreshKey = 0;

  topFive: (LeaderboardEntry | null)[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.load();
  }

  ngOnChanges(): void {
    this.load();
  }

  private load(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const stored: LeaderboardEntry[] = JSON.parse(
      localStorage.getItem('leaderboard') || '[]'
    );
    this.topFive = Array.from({ length: 5 }).map(
      (_, i) => stored[i] || null
    );
  }
}