import Game from 'src/business/Game';
import PlayerType from 'src/types/PlayerType';
import RoomPosition from 'src/types/RoomPosition';

export default abstract class Player {
  constructor(public name: string) {}

  abstract get actor(): 'HUMAN' | 'BOT';

  toString(): string {
    return `${this.name}${this.actor === 'BOT' ? ' [BOT]' : ''}`;
  }

  abstract async play(game: Game, as: PlayerType): Promise<RoomPosition>;
}
