export interface Tile {
  id: string;
  label: string;
  glyph: string;

  kind:
    | {
        category: 'number';
        suit: 'bamboo' | 'characters' | 'dots';
      }
    | {
        category: 'dragon';
        dragon: 'red' | 'green' | 'white';
      }
    | {
        category: 'wind';
      };
}

export interface RoundRecord {
  index: number;
  total: number;
  bet?: 'higher' | 'lower';
  result?: 'win' | 'loss' | 'push';
  hand: Tile[];
}

export interface LeaderboardEntry {
  name: string;
  rounds: number;
  score: number;
}