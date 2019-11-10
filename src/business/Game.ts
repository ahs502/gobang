import Room from 'src/types/Room';
import Position from 'src/types/Position';
import Bead from 'src/types/Bead';

/**
 * The state manager of an instance of Gobang game.
 */
export default class Game {
  /** The state of all the rooms in the board. */
  state: Room[][];

  /** `'FINISHED'`, `'WITHDRAWAL'` or the number of beads on board. */
  status: number | 'FINISHED' | 'WITHDRAWAL';

  constructor(public size: number) {
    this.state = Array.from<any, Room[]>(Array(size), () => Array.from<any, Room>(Array(size), () => 'NONE')); // Empty board.
    this.status = 0; // No beads initially.
  }

  /**
   * Sets a new bead and returns true iff the current player wins.
   * @param bead The bead type: `'BLACK'` or `'WHITE'`.
   * @param roomPosition The position of the target room.
   */
  set(bead: Bead, { row, column }: Position): boolean {
    const { size, state, status } = this;

    if (status === 'FINISHED' || status === 'WITHDRAWAL') throw new Error('The game is already over!');
    if (row < 0 || row >= size || column < 0 || column >= size) throw new Error('Out of board.');
    if (state[row][column] !== 'NONE') throw new Error('This room is set before.');

    state[row][column] = bead; // Set the bead in the room.

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
        strikeUp + strikeDown >= 4 /* Vertical match */ ||
        strikeUpRight + strikeDownLeft >= 4 /* Reverse diagonal match */ ||
        strikeRight + strikeLeft >= 4 /* Horizontal match */ ||
        strikeDownRight + strikeUpLeft >= 4 /* Diagonal match */;

    // Update the status of the game:
    this.status = won ? 'FINISHED' : status + 1 === size ** 2 ? 'WITHDRAWAL' : status + 1;

    return won;

    /**
     * Returns the number of extra rooms with the same kind
     * of bead in some certain direction out of the target room.
     */
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
          state[rowCheck][columnCheck] !== bead
        )
          break;
        count++;
      }
      return count;
    }
  }
}
