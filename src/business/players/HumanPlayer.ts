import Player from 'src/business/Player';
import Game from 'src/business/Game';
import Bead from 'src/types/Bead';
import Position from 'src/types/Position';

/**
 * Implements a human player which acts
 * upon user mouse clicks on the board.
 */
export default class HumanPlayer extends Player {
  private resolve?: (value: Position) => void;

  constructor(name: string) {
    super(name);
  }

  get bot(): boolean {
    return false;
  }

  play(game: Game, as: Bead): Promise<Position> {
    return new Promise((resolve, reject) => (this.resolve = resolve));
  }

  /**
   * Handles the click event on the board for this player.
   * @param position The clicked position on the board.
   */
  handleBoardClick(position: Position): void {
    const resolve = this.resolve;
    if (!resolve) return;
    delete this.resolve; // Only play once on each turn.
    resolve(position);
  }
}
