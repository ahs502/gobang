import React, { FC, useState, useEffect, Fragment, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import Game from 'src/business/Game';
import Player from 'src/business/Player';
import PlayerType from 'src/types/PlayerType';
import RoomPosition from 'src/types/RoomPosition';
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
  info: {
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
    '& > div': {
      position: 'relative',
      top: -1,
      left: 3,
      width: 20
    }
  }
});

export interface GameboardProps {
  game: Game;
  blackPlayer: Player;
  whitePlayer: Player;
  onRoomSelect(selectedRoomPosition: RoomPosition): void;
}

const Gameboard: FC<GameboardProps> = ({ game, blackPlayer, whitePlayer, onRoomSelect }) => {
  const [turn, setTurn] = useState<PlayerType>('BLACK');
  const player = turn === 'BLACK' ? blackPlayer : whitePlayer;
  const [winner, setWinner] = useState<Player | null>(null);
  useEffect(() => {
    if (game.status === 'FINISHED' || game.status === 'WITHDRAWAL') return;
    (async function play(): Promise<void> {
      await player
        .play(game, turn)
        .then(roomPosition =>
          game.set(turn, roomPosition) ? setWinner(player) : setTurn(turn === 'BLACK' ? 'WHITE' : 'BLACK')
        )
        .catch(reason => {
          alert(String(reason));
          return play();
        });
    })();
  }, [player]);

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        {game.status === 'FINISHED' ? (
          <Fragment>{`${winner} won!`}</Fragment>
        ) : game.status === 'WITHDRAWAL' ? (
          <Fragment>No winners.</Fragment>
        ) : (
          <Fragment>
            Move: <strong>{game.status + 1}</strong>
            &nbsp;&nbsp;&nbsp;&nbsp; Turn:
            <div className={styles.bead}>{getMark(turn)}</div>
            {`${player}`}
          </Fragment>
        )}
      </div>
      <div className={styles.board}>
        {game.state.map((rowRooms, row) => (
          <div key={row}>
            {rowRooms.map((room, column) => (
              <div key={column} className={styles.room} onClick={() => onRoomSelect({ row, column })}>
                <div>{getMark(room)}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  function getMark(room: Room): string {
    return room === 'BLACK' ? '⚫' : room === 'WHITE' ? '⚪' : ' ';
  }
};

export default Gameboard;
