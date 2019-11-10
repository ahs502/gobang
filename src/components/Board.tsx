import React, { FC, useState, useEffect, Fragment } from 'react';
import { createUseStyles } from 'react-jss';
import Game from 'src/business/Game';
import Player from 'src/business/Player';
import Bead from 'src/types/Bead';
import Position from 'src/types/Position';
import Room from 'src/types/Room';

const useStyles = createUseStyles({
  root: {
    display: 'inline-block',
    userSelect: 'none',
    margin: 20,
    padding: 10,
    border: '1px solid black',
    borderRadius: 5,
    backgroundColor: 'azure'
  },
  header: {
    margin: 10
  },
  bead: {
    display: 'inline',
    margin: '0 10px'
  },
  board: {
    border: '1px solid lightgrey',
    backgroundColor: 'lightyellow'
  },
  room: {
    display: 'inline-block',
    cursor: 'pointer',
    margin: 0,
    padding: 0,
    fontSize: '28px',
    lineHeight: '30px',
    width: 30,
    border: '1px solid lightgrey',
    '&:hover': {
      backgroundColor: 'white'
    },
    '& > div': {
      position: 'relative',
      top: -1,
      left: 3,
      width: 20
    }
  }
});

export interface BoardProps {
  game: Game;
  blackPlayer: Player;
  whitePlayer: Player;
  onClick(position: Position): void;
}

const Board: FC<BoardProps> = ({ game, blackPlayer, whitePlayer, onClick }) => {
  const [turn, setTurn] = useState<Bead>('BLACK');
  const player = turn === 'BLACK' ? blackPlayer : whitePlayer; // Current player.
  const bead = turn; // The bead to play next.

  const [winner, setWinner] = useState<Player | null>(null);

  // Make the next move happen:
  useEffect(() => {
    if (game.status === 'FINISHED' || game.status === 'WITHDRAWAL') return;

    play();

    async function play(): Promise<void> {
      await player
        .play(game, bead)
        .then(position => {
          const won = game.set(bead, position);
          if (won) {
            setWinner(player); // We have a winner!
          } else {
            setTurn(turn === 'BLACK' ? 'WHITE' : 'BLACK'); // Next player.
          }
        })
        .catch(reason => {
          alert(String(reason));
          return play(); // Same player, try again.
        });
    }
  }, [player]);

  const styles = useStyles();

  const header = (
    <div className={styles.header}>
      {game.status === 'FINISHED' ? (
        <strong>{`${winner} won!`}</strong>
      ) : game.status === 'WITHDRAWAL' ? (
        <Fragment>No winners.</Fragment>
      ) : (
        <Fragment>
          Move: <strong>{game.status + 1}</strong>
          &nbsp;&nbsp;&nbsp;&nbsp; Turn:
          <div className={styles.bead}>{getIcon(turn)}</div>
          {`${player}`}
        </Fragment>
      )}
    </div>
  );

  const board = (
    <div className={styles.board}>
      {game.state.map((rowRooms, row) => (
        <div key={row}>
          {rowRooms.map((room, column) => (
            <div key={column} className={styles.room} onClick={() => onClick({ row, column })}>
              <div>{getIcon(room)}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.root}>
      {header}
      {board}
    </div>
  );

  function getIcon(room: Room): string {
    return room === 'BLACK' ? '⚫' : room === 'WHITE' ? '⚪' : ' ' /* non-breaking space */;
  }
};

export default Board;
