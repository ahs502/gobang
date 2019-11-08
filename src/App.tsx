import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import HumanPlayer from 'src/business/players/HumanPlayer';
import Game from 'src/business/Game';
import Gameboard from 'src/components/Gameboard';

const useStyles = createUseStyles({});

const App: React.FC = () => {
  const [game, setGame] = useState<Game>(() => new Game(15));
  const [blackPlayer, setBlackPlayer] = useState<HumanPlayer>(() => new HumanPlayer('Hessamoddin'));
  const [whitePlayer, setWhitePlayer] = useState<HumanPlayer>(() => new HumanPlayer('Amin Shokravi'));

  const styles = useStyles();

  return (
    <Gameboard
      game={game}
      blackPlayer={blackPlayer}
      whitePlayer={whitePlayer}
      onRoomSelect={selectedRoomPosition => {
        blackPlayer.reportRoomSelect(selectedRoomPosition);
        whitePlayer.reportRoomSelect(selectedRoomPosition);
      }}
    ></Gameboard>
  );
};

export default App;
