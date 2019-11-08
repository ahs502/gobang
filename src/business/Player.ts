import Game from 'src/business/Game';
import PlayerType from 'src/types/PlayerType';
import RoomPosition from 'src/types/RoomPosition';

/**
 * The abstract class for any kind of Gobang player.
 * There can be several implementation of this in `src/business/players/` folder.
 */
export default abstract class Player {
  constructor(public name: string) {}

  /** Returns whether this player represents a human activity or a bot? */
  abstract get actor(): 'HUMAN' | 'BOT';

  toString(): string {
    return `${this.name}${this.actor === 'BOT' ? ' [BOT]' : ''}`;
  }

  /**
   * Returns a promise to resolve the decided room position for the next move.
   * @param game Which game to play right now?
   * @param as The role of this player in the specified game.
   */
  abstract async play(game: Game, as: PlayerType): Promise<RoomPosition>;
}
