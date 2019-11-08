import PlayerType from 'src/types/PlayerType';
import RoomPosition from 'src/types/RoomPosition';

type Room = PlayerType | 'NONE';

export default class Game {
  /** The state of the beads in all rooms. */
  state: Room[][];

  /** `'FINISHED'`, `'WITHDRAWAL'` or the number of beads on board. */
  status: number | 'FINISHED' | 'WITHDRAWAL';

  constructor(public size: 15 | 19) {
    this.state = Array.from<any, Room[]>(Array(size), () => Array.from<any, Room>(Array(size), () => 'NONE'));
    this.status = 0;
  }

  /**
   * Sets a new bead and returns true iff the player wins.
   * @param playerType The player type: `'BLACK'` or `'WHITE'`.
   * @param roomPosition The position of the target room.
   */
  set(playerType: PlayerType, { row, column }: RoomPosition): boolean {
    if (this.status === 'FINISHED' || this.status === 'WITHDRAWAL') throw new Error('The game is already over!');
    if (row < 0 || row >= this.size || column < 0 || column >= this.size) throw new Error('Out of board.');
    if (this.state[row][column] !== 'NONE') throw new Error('This room is set before.');

    this.state[row][column] = playerType;

    // Check whether the player wins or not:
    const fromTop = row >= 4;
    const fromBottom = row <= this.size - 5;
    const fromLeft = column >= 4;
    const fromRight = column <= this.size - 5;

    const won =
      (fromTop && check(-1, 0)) ||
      (fromBottom && check(1, 0)) ||
      (fromLeft && check(0, -1)) ||
      (fromRight && check(0, 1)) ||
      (fromTop && fromLeft && check(-1, -1)) ||
      (fromTop && fromRight && check(-1, 1)) ||
      (fromBottom && fromLeft && check(1, -1)) ||
      (fromBottom && fromRight && check(1, 1));

    // Update the status of the game:
    this.status = won ? 'FINISHED' : this.status + 1 === this.size ** 2 ? 'WITHDRAWAL' : this.status + 1;

    return won;

    const state = this.state;
    function check(rowStep: -1 | 0 | 1, columnStep: -1 | 0 | 1): boolean {
      for (let i = 0; i < 5; ++i) {
        if (state[row + i * rowStep][column + i * columnStep] !== playerType) return false;
      }
      return true;
    }
  }
}
