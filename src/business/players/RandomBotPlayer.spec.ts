import RandomBotPlayer from './RandomBotPlayer';
import Game from '../Game';

describe('RandomBotPlayer class', () => {
  it('should be initialized successfully', () => {
    const player = new RandomBotPlayer('Computer', 10);
    expect(player.actor).toBe('BOT');
    expect(player.toString()).toBe('Computer [BOT]');
  });

  describe('play method', () => {
    let player: RandomBotPlayer;
    let game: Game;

    beforeEach(() => {
      player = new RandomBotPlayer('Computer', 10);
      game = new Game(15);
    });

    it('should provide a promise that will be resolved to a random position', async () => {
      const result = player.play(game, 'BLACK');
      expect(result).toBeInstanceOf(Promise);
      const decidedRoomPosition = await result;
      expect(decidedRoomPosition).toHaveProperty('row');
      expect(typeof decidedRoomPosition.row).toBe('number');
      expect(decidedRoomPosition).toHaveProperty('column');
      expect(typeof decidedRoomPosition.column).toBe('number');
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
      for (let row = 0; row < game.size; row += 2)
        for (let column = 0; column < game.size; ++column) {
          game.set(column % 2 === 0 ? 'BLACK' : 'WHITE', { row, column });
        }

      for (let i = 0; i < 100; ++i) {
        const { row } = await player.play(game, 'WHITE');
        expect(row % 2).toBe(1);
      }
    });
  });
});
