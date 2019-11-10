import Game from 'src/business/Game';
import Bead from 'src/types/Bead';
import Position from 'src/types/Position';

/**
 * The abstract class for any kind of Gobang player.
 * There can be several implementation of this in `src/business/players/` folder.
 */
export default abstract class Player {
  constructor(public name: string) {}

  /** Returns whether this player represents a human or a bot? */
  abstract get bot(): boolean;

  toString(): string {
    return `${this.name}${this.bot ? ' [BOT]' : ''}`;
  }

  /**
   * Returns a promise to resolve the decided room position for the next move.
   * @param game Which game to play right now?
   * @param bead The bead which this player is about to set.
   */
  abstract async play(game: Game, bead: Bead): Promise<Position>;
}
