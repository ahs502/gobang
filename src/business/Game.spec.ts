import Game from './Game';

describe('Game class', () => {
  it('should be initialized successfully', () => {
    const game = new Game(15);
    expect(game.size).toBe(15);
    expect(game.state).toEqual(Array.from(Array(15), () => Array.from(Array(15), () => 'NONE')));
    expect(game.status).toBe(0);
  });

  describe('set method', () => {
    it('should set state and update status', () => {
      const game = new Game(15);
      const result = game.set('BLACK', { row: 7, column: 8 });
      expect(result).toBe(false);
      const expectedState = Array.from(Array(15), () => Array.from(Array(15), () => 'NONE'));
      expectedState[7][8] = 'BLACK';
      expect(game.state).toEqual(expectedState);
      expect(game.status).toBe(1);
    });

    it('should not let a full room to accept another bead', () => {
      const game = new Game(15);
      game.set('WHITE', { row: 5, column: 5 });
      const exception = fetchException(() => game.set('BLACK', { row: 5, column: 5 }));
      expect(exception).not.toBe(null);
    });

    it.each`
      row   | column
      ${-2} | ${5}
      ${50} | ${5}
      ${5}  | ${-1}
      ${5}  | ${50}
    `('should not let the beat to be set out of the board: <$row, $column>', ({ row, column }) => {
      const game = new Game(15);
      const exception = fetchException(() => game.set('BLACK', { row, column }));
      expect(exception).not.toBe(null);
    });

    it.each`
      name                  | sequence
      ${'horizontal'}       | ${[[5, 5], [5, 6], [5, 7], [5, 8], [5, 9]]}
      ${'vertical'}         | ${[[5, 5], [6, 5], [9, 5], [8, 5], [7, 5]]}
      ${'diagonal'}         | ${[[5, 5], [7, 7], [9, 9], [6, 6], [8, 8]]}
      ${'reverse diagonal'} | ${[[7, 7], [9, 5], [6, 8], [8, 6], [5, 9]]}
    `('should detect a $name winning state', ({ name, sequence }) => {
      const game = new Game(15);
      for (let i = 0; i < sequence.length - 1; i++) {
        const result = game.set('WHITE', { row: sequence[i][0], column: sequence[i][1] });
        expect(result).toBe(false);
        expect(game.status).toBe(i + 1);
      }
      const result = game.set('WHITE', {
        row: sequence[sequence.length - 1][0],
        column: sequence[sequence.length - 1][1]
      });
      expect(result).toBe(true);
      expect(game.status).toBe('FINISHED');
    });

    it('should not continue after a win', () => {
      const game = new Game(15);
      game.set('BLACK', { row: 5, column: 5 });
      game.set('BLACK', { row: 5, column: 6 });
      game.set('BLACK', { row: 5, column: 7 });
      game.set('BLACK', { row: 5, column: 8 });
      game.set('BLACK', { row: 5, column: 9 });
      const exception = fetchException(() => game.set('WHITE', { row: 1, column: 1 }));
      expect(exception).not.toBe(null);
    });

    describe('withdrawal behaviour', () => {
      let game: Game;

      beforeEach(() => {
        game = new Game(15);
        /*
          A no winners state:
            0 1 0 1 0 1 0 1
            0 1 0 1 0 1 0 1
            1 0 1 0 1 0 1 0
            1 0 1 0 1 0 1 0
            0 1 0 1 0 1 0 1
            0 1 0 1 0 1 0 1
            1 0 1 0 1 0 1 0
            1 0 1 0 1 0 1 0
        */
        for (let row = 0; row < 15; ++row)
          for (let column = 0; column < 15; ++column) {
            const rowPairIsEven = Math.floor(row / 2) % 2 === 0;
            const columnIsEven = column % 2 === 0;
            const bead = rowPairIsEven === columnIsEven ? 'WHITE' : 'BLACK';
            game.set(bead, { row, column });
          }
      });

      it('should make a withdrawal if all rooms are set without a winner', () => {
        expect(game.status).toBe('WITHDRAWAL');
      });

      it('should not continue after a withdrawal', () => {
        const exception = fetchException(() => game.set('WHITE', { row: 1, column: 1 }));
        expect(exception).not.toBe(null);
      });
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
