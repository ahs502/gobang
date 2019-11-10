import HumanPlayer from './HumanPlayer';
import Game from '../Game';

describe('HumanPlayer class', () => {
  it('should be initialized successfully', () => {
    const player = new HumanPlayer('Hessamoddin');
    expect(player.bot).toBe(false);
    expect(player.toString()).toBe('Hessamoddin');
  });

  describe('handleBoardClick method', () => {
    let player: HumanPlayer;

    beforeEach(() => {
      player = new HumanPlayer('Hessamoddin');
    });

    it('should provide a method to be called on every user click on board', () => {
      expect(typeof player.handleBoardClick).toBe('function');
    });

    it('should do nothing before the player has started to play', () => {
      const exception = fetchException(() => player.handleBoardClick({ row: 1, column: 1 }));
      expect(exception).toBe(null);
    });
  });

  describe('play method', () => {
    let player: HumanPlayer;

    beforeEach(() => {
      player = new HumanPlayer('Hessamoddin');
    });

    it('should provide a promise to be resolved to the clicked room position by user', async () => {
      const game = new Game(15);
      const promise = player.play(game, 'BLACK');
      player.handleBoardClick({ row: 5, column: 7 }); // Simulate the mouse click event.
      const decidedRoomPosition = await promise;
      expect(decidedRoomPosition).toEqual({ row: 5, column: 7 });
    });
  });
});

///////////////////////////////////////////////////////////////////////////////

function fetchException(operation: () => void): any {
  try {
    operation();
  } catch (error) {
    return error;
  }
  return null;
}
