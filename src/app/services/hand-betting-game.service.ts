import { Injectable } from '@angular/core';

export type Suit = 'bamboo' | 'characters' | 'dots';
export type Dragon = 'red' | 'green' | 'white';
export type Wind = 'east' | 'south' | 'west' | 'north';

export type TileKind =
  | { category: 'number'; suit: Suit; value: number }
  | { category: 'dragon'; dragon: Dragon }
  | { category: 'wind'; wind: Wind };

export type TileId = string;

export interface Tile {
  id: TileId;
  kind: TileKind;
  label: string;
  glyph: string;
}

export type Bet = 'higher' | 'lower';
export type BetResult = 'win' | 'loss' | 'push';

export interface RoundRecord {
  index: number;
  hand: Tile[];
  total: number;
  bet: Bet | null;
  nextTotal: number | null;
  result: BetResult | null;
}

export type GameOverReason = 'tile-floor' | 'tile-ceiling' | 'deck-exhausted';

export interface GameState {
  tileValues: Record<TileId, number>;
  drawPile: Tile[];
  discardPile: Tile[];
  currentHand: Tile[];
  history: RoundRecord[];
  score: number;
  round: number;
  reshuffleCount: number;
  status: 'playing' | 'revealing' | 'over';
  gameOverReason: GameOverReason | null;
  gameOverTileId: TileId | null;
}

export interface GameConfig {
  handSize: number;
  nonNumberBaseValue: number;
  tileFloor: number;
  tileCeiling: number;
  maxReshuffles: number;
  winPoints: number;
  lossPoints: number;
}

export const DEFAULT_CONFIG: GameConfig = {
  handSize: 5,
  nonNumberBaseValue: 5,
  tileFloor: 0,
  tileCeiling: 10,
  maxReshuffles: 3,
  winPoints: 10,
  lossPoints: 0,
};

const SUITS: readonly Suit[] = ['bamboo', 'characters', 'dots'];
const DRAGONS: readonly Dragon[] = ['red', 'green', 'white'];
const WINDS: readonly Wind[] = ['east', 'south', 'west', 'north'];

const NUMBER_GLYPHS: Record<Suit, string[]> = {
  bamboo: ['🀐', '🀑', '🀒', '🀓', '🀔', '🀕', '🀖', '🀗', '🀘'],
  characters: ['🀇', '🀈', '🀉', '🀊', '🀋', '🀌', '🀍', '🀎', '🀏'],
  dots: ['🀙', '🀚', '🀛', '🀜', '🀝', '🀞', '🀟', '🀠', '🀡'],
};

const DRAGON_GLYPHS: Record<Dragon, string> = {
  red: '🀄',
  green: '🀅',
  white: '🀆',
};

const WIND_GLYPHS: Record<Wind, string> = {
  east: '🀀',
  south: '🀁',
  west: '🀂',
  north: '🀃',
};

const SUIT_LABEL: Record<Suit, string> = {
  bamboo: 'Bamboo',
  characters: 'Characters',
  dots: 'Dots',
};

const DRAGON_LABEL: Record<Dragon, string> = {
  red: 'Red Dragon',
  green: 'Green Dragon',
  white: 'White Dragon',
};

const WIND_LABEL: Record<Wind, string> = {
  east: 'East Wind',
  south: 'South Wind',
  west: 'West Wind',
  north: 'North Wind',
};

function tileId(kind: TileKind): string {
  if (kind.category === 'number') return `n-${kind.suit}-${kind.value}`;
  if (kind.category === 'dragon') return `d-${kind.dragon}`;
  return `w-${kind.wind}`;
}

function makeTile(kind: TileKind): Tile {
  const id = tileId(kind);

  if (kind.category === 'number') {
    return {
      id,
      kind,
      label: `${kind.value} ${SUIT_LABEL[kind.suit]}`,
      glyph: NUMBER_GLYPHS[kind.suit][kind.value - 1],
    };
  }

  if (kind.category === 'dragon') {
    return {
      id,
      kind,
      label: DRAGON_LABEL[kind.dragon],
      glyph: DRAGON_GLYPHS[kind.dragon],
    };
  }

  return {
    id,
    kind,
    label: WIND_LABEL[kind.wind],
    glyph: WIND_GLYPHS[kind.wind],
  };
}

export const TILE_CATALOG: Tile[] = (() => {
  const out: Tile[] = [];

  for (const s of SUITS) {
    for (let i = 1; i <= 9; i++) {
      out.push(makeTile({ category: 'number', suit: s, value: i }));
    }
  }

  for (const d of DRAGONS) {
    out.push(makeTile({ category: 'dragon', dragon: d }));
  }

  for (const w of WINDS) {
    out.push(makeTile({ category: 'wind', wind: w }));
  }

  return out;
})();

const COPIES = 4;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): Tile[] {
  const deck: Tile[] = [];
  for (let i = 0; i < COPIES; i++) {
    for (const t of TILE_CATALOG) deck.push(t);
  }
  return deck;
}

function valueOf(tile: Tile, values: Record<string, number>, config: GameConfig): number {
  if (tile.kind.category === 'number') return tile.kind.value;
  return values[tile.id] ?? config.nonNumberBaseValue;
}

function handTotal(hand: Tile[], values: Record<string, number>, config: GameConfig): number {
  return hand.reduce((s, t) => s + valueOf(t, values, config), 0);
}

@Injectable({ providedIn: 'root' })
export class HandBettingGameService {

  config: GameConfig = DEFAULT_CONFIG;

  state: GameState = this.createInitialState();

  createInitialState(): GameState {
    const draw = shuffle(buildDeck());

    const hand = draw.splice(0, this.config.handSize);

    return {
      tileValues: {},
      drawPile: draw,
      discardPile: [],
      currentHand: hand,
      history: [],
      score: 0,
      round: 1,
      reshuffleCount: 0,
      status: 'playing',
      gameOverReason: null,
      gameOverTileId: null,
    };
  }

  reset(): void {
    this.state = this.createInitialState();
  }

  bet(choice: Bet): void {
    if (this.state.status === 'over') return;

    const currentTotal = handTotal(
      this.state.currentHand,
      this.state.tileValues,
      this.config
    );

    const discard = [
      ...this.state.discardPile,
      ...this.state.currentHand
    ];

    let draw = [...this.state.drawPile];
    let reshuffles = this.state.reshuffleCount;

    const nextHand: Tile[] = [];

    for (let i = 0; i < this.config.handSize; i++) {

      if (draw.length === 0) {
        reshuffles++;

        draw = shuffle([
          ...buildDeck(),
          ...discard
        ]);
      }

      const tile = draw.shift();

      if (tile) {
        nextHand.push(tile);
      }
    }

    const nextTotal = handTotal(
      nextHand,
      this.state.tileValues,
      this.config
    );

    let result: BetResult;

    if (nextTotal === currentTotal) {
      result = 'push';
    } else if (choice === 'higher') {
      result = nextTotal > currentTotal ? 'win' : 'loss';
    } else {
      result = nextTotal < currentTotal ? 'win' : 'loss';
    }

    const newScore =
      this.state.score +
      (result === 'win'
        ? this.config.winPoints
        : this.config.lossPoints);

    const record: RoundRecord = {
      index: this.state.round,
      hand: [...this.state.currentHand],
      total: currentTotal,
      bet: choice,
      nextTotal,
      result,
    };

    let status: GameState['status'] = 'playing';

    if (reshuffles >= this.config.maxReshuffles) {
      status = 'over';
    }

    this.state = {
      tileValues: { ...this.state.tileValues },

      drawPile: [...draw],

      discardPile: [...discard],

      currentHand: [...nextHand],

      history: [record, ...this.state.history],

      score: newScore,

      round: this.state.round + 1,

      reshuffleCount: reshuffles,

      status,

      gameOverReason: null,

      gameOverTileId: null,
    };
    console.log('update', this.state);
  }


  get currentTotal(): number {
    return handTotal(this.state.currentHand, this.state.tileValues, this.config);
  }
  saveLeaderboard(name: string): void {
    if (typeof window === 'undefined') return;

    const entry = {
      name,
      score: this.state.score,
      rounds: this.state.round - 1,
      date: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    existing.push(entry);
    existing.sort((a: any, b: any) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(existing.slice(0, 5)));
  }
}