import Game from 'src/business/Game';
import Player from 'src/business/Player';
import PlayerType from 'src/types/PlayerType';
import RoomPosition from 'src/types/RoomPosition';

export default class HumanPlayer extends Player {
  readonly actor: Player['actor'];
  private resolve?: (value: RoomPosition) => void;

  constructor(name: string) {
    super(name);
    this.actor = 'HUMAN';
  }

  play(game: Game, as: PlayerType): Promise<RoomPosition> {
    return new Promise((resolve, reject) => (this.resolve = resolve));
  }

  reportRoomSelect(selectedRoomPosition: RoomPosition): void {
    const resolve = this.resolve;
    if (!resolve) return;
    delete this.resolve;
    resolve(selectedRoomPosition);
  }
}
