import Player from 'src/business/Player';
import Game from 'src/business/Game';
import PlayerType from 'src/types/PlayerType';
import RoomPosition from 'src/types/RoomPosition';

export default class RandomBotPlayer extends Player {
  readonly actor: Player['actor'];

  constructor(name: string) {
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
      }, 400);
    });
  }
}
