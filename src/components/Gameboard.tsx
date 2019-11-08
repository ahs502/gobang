import React, { FC, useState, useEffect, Fragment } from 'react';
import { createUseStyles } from 'react-jss';
import Game from 'src/business/Game';
import Player from 'src/business/Player';
import PlayerType from 'src/types/PlayerType';
import RoomPosition from 'src/types/RoomPosition';

const useStyles = createUseStyles({
  root: {},
  bead: {},
  info: {},
  board: {},
  room: {}
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
  const otherPlayer = turn === 'BLACK' ? whitePlayer : blackPlayer;
  useEffect(() => {
    (async function play(): Promise<void> {
      await player
        .play(game, turn)
        .then(roomPosition => {
          game.set(turn, roomPosition);
          setTurn(turn === 'BLACK' ? 'WHITE' : 'BLACK');
        })
        .catch(reason => {
          alert(String(reason));
          return play();
        });
    })();
  }, [player]);

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.board}>
        {game.state.map((rowRooms, row) => (
          <div key={row}>
            {rowRooms.map((room, column) => (
              <div key={column} className={styles.room} onClick={() => onRoomSelect({ row, column })}>
                {room === 'BLACK' ? 'X' : room === 'WHITE' ? 'O' : '?'}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.info}>
        {game.status === 'FINISHED' ? (
          <Fragment>{otherPlayer.toString()} won!</Fragment>
        ) : game.status === 'WITHDRAWAL' ? (
          <Fragment>No winners.</Fragment>
        ) : (
          <Fragment>
            Move: {game.status + 1}, Turn:
            <div className={styles.bead}>{turn === 'BLACK' ? '(X)' : '(O)'}</div>
            {player.toString()}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Gameboard;