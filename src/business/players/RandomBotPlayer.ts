import Player from 'src/business/Player';
import Game from 'src/business/Game';
import Bead from 'src/types/Bead';
import Position from 'src/types/Position';

/**
 * Implements a silly and simple bot player which only
 * puts its beads randomly after a certain amount of delay.
 * It is a good example of how to implement different
 * kinds of AI-powered players.
 */
export default class RandomBotPlayer extends Player {
  constructor(name: string, private delay: number) {
    super(name);
  }

  get bot(): boolean {
    return true;
  }

  async play(game: Game, bead: Bead): Promise<Position> {
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
