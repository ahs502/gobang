import Player from 'src/business/Player';
import Game from 'src/business/Game';
import PlayerType from 'src/types/PlayerType';
import RoomPosition from 'src/types/RoomPosition';

/**
 * Implements a silly and simple bot player which only
 * puts its beads randomly after a certain amount of delay.
 * It is a good example of how to implement different
 * kinds of AI-powered players.
 */
export default class RandomBotPlayer extends Player {
  readonly actor: Player['actor'];

  constructor(name: string, private delay: number) {
    super(name);
    this.actor = 'BOT';
  }

  async play(game: Game, as: PlayerType): Promise<RoomPosition> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let row: number, column: number;
        do {
          row = Math.floor(game.size * Math.random());
          column = Math.floor(game.size * Math.random());
        } while (game.state[row][column] !== 'NONE');
        resolve({ row, column });
      }, this.delay);
    });
  }
}
