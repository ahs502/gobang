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
    const { size, state, status } = this;

    if (status === 'FINISHED' || status === 'WITHDRAWAL') throw new Error('The game is already over!');
    if (row < 0 || row >= size || column < 0 || column >= size) throw new Error('Out of board.');
    if (state[row][column] !== 'NONE') throw new Error('This room is set before.');

    state[row][column] = playerType;

    // Check whether the player wins or not:
    const won = check(1, 0) || check(0, 1) || check(1, 1);

    // Update the status of the game:
    this.status = won ? 'FINISHED' : status + 1 === size ** 2 ? 'WITHDRAWAL' : status + 1;

    return won;

    function check(rowStep: 0 | 1, columnStep: 0 | 1): boolean {
      let rowBase = row;
      let columnBase = column;
      while (
        rowBase >= rowStep &&
        columnBase >= columnStep &&
        state[(rowBase -= rowStep)][(columnBase -= columnStep)] === playerType
      ) {}
      for (let i = 1; i <= 5; ++i) {
        const rowCheck = rowBase + i * rowStep;
        const columnCheck = columnBase + i * columnStep;
        if (rowCheck >= size || columnCheck >= size) return false;
        if (state[rowCheck][columnCheck] !== playerType) return false;
      }
      return true;
    }
  }
}
