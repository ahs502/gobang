import PlayerType from 'src/types/PlayerType';
import RoomPosition from 'src/types/RoomPosition';
import Configuration from 'src/types/Configuration';

type Room = PlayerType | 'NONE';

export default class Game {
  /** The state of the beads in all rooms. */
  state: Room[][];

  /** `'FINISHED'`, `'WITHDRAWAL'` or the number of beads on board. */
  status: number | 'FINISHED' | 'WITHDRAWAL';

  constructor(public size: Configuration['size']) {
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
    const strikeUp = countStrike(-1, 0),
      strikeUpRight = countStrike(-1, 1),
      strikeRight = countStrike(0, 1),
      strikeDownRight = countStrike(1, 1),
      strikeDown = countStrike(1, 0),
      strikeDownLeft = countStrike(1, -1),
      strikeLeft = countStrike(0, -1),
      strikeUpLeft = countStrike(-1, -1);
    const won =
      strikeUp + strikeDown >= 4 ||
      strikeUpRight + strikeDownLeft >= 4 ||
      strikeRight + strikeLeft >= 4 ||
      strikeDownRight + strikeUpLeft >= 4;

    // Update the status of the game:
    this.status = won ? 'FINISHED' : status + 1 === size ** 2 ? 'WITHDRAWAL' : status + 1;

    return won;

    function countStrike(rowStep: 0 | 1 | -1, columnStep: 0 | 1 | -1): number {
      let count = 0;
      while (true) {
        const rowCheck = row + (count + 1) * rowStep;
        const columnCheck = column + (count + 1) * columnStep;
        if (
          rowCheck < 0 ||
          rowCheck >= size ||
          columnCheck < 0 ||
          columnCheck >= size ||
          state[rowCheck][columnCheck] !== playerType
        )
          break;
        count++;
      }
      return count;
    }
  }
}
