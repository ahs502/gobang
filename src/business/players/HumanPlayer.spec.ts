import HumanPlayer from './HumanPlayer';
import Game from '../Game';

describe('HumanPlayer class', () => {
  it('should be initialized successfully', () => {
    const player = new HumanPlayer('Hessamoddin');
    expect(player.actor).toBe('HUMAN');
    expect(player.toString()).toBe('Hessamoddin');
  });

  describe('informRoomSelect method', () => {
    let player: HumanPlayer;

    beforeEach(() => {
      player = new HumanPlayer('Hessamoddin');
    });

    it('should provide the method to be informed of any room selection by click', () => {
      expect(typeof player.informRoomSelect).toBe('function');
    });

    it('should do nothing before the player has started to play', () => {
      const exception = fetchException(() => player.informRoomSelect({ row: 1, column: 1 }));
      expect(exception).toBe(null);
    });
  });

  describe('play method', () => {
    let player: HumanPlayer;

    beforeEach(() => {
      player = new HumanPlayer('Hessamoddin');
    });

    it('should provide a promise that will be resolved by a room selection', async () => {
      const game = new Game(15);
      const result = player.play(game, 'BLACK');
      expect(result).toBeInstanceOf(Promise);
      player.informRoomSelect({ row: 5, column: 7 });
      const decidedRoomPosition = await result;
      expect(decidedRoomPosition).toEqual({ row: 5, column: 7 });
    });
  });
});

function fetchException(operation: () => void): any {
  try {
    operation();
  } catch (error) {
    return error;
  }
  return null;
}
