import RandomBotPlayer from './RandomBotPlayer';
import Game from '../Game';

describe('RandomBotPlayer class', () => {
  it('should be initialized successfully', () => {
    const player = new RandomBotPlayer('Computer', 10);
    expect(player.bot).toBe(true);
    expect(player.toString()).toBe('Computer [BOT]');
  });

  describe('play method', () => {
    let player: RandomBotPlayer;
    let game: Game;

    beforeEach(() => {
      player = new RandomBotPlayer('Computer', 10);
      game = new Game(15);
    });

    it('should provide a promise to be resolved to a random free position', async () => {
      const { row, column } = await player.play(game, 'BLACK');
      expect(typeof row).toBe('number');
      expect(typeof column).toBe('number');
    });

    it('should not provide a position outside the board', async () => {
      for (let i = 0; i < 100; ++i) {
        const { row, column } = await player.play(game, 'WHITE');
        expect(row).toBeGreaterThanOrEqual(0);
        expect(row).toBeLessThan(game.size);
        expect(column).toBeGreaterThanOrEqual(0);
        expect(column).toBeLessThan(game.size);
      }
    });

    it('should not provide a position that is set before', async () => {
      /*
        A semi-full board without a winner:
          0 1 0 1 0 1 0 1
          - - - - - - - -
          0 1 0 1 0 1 0 1
          - - - - - - - -
          0 1 0 1 0 1 0 1
          - - - - - - - -
          0 1 0 1 0 1 0 1
          - - - - - - - -
      */
      for (let row = 0; row < game.size; row += 2)
        for (let column = 0; column < game.size; ++column) {
          game.set(column % 2 === 0 ? 'BLACK' : 'WHITE', { row, column });
        }

      for (let i = 0; i < 100; ++i) {
        const { row } = await player.play(game, 'WHITE');
        expect(row % 2).toBe(1); // Only in the empty rows.
      }
    });
  });
});
