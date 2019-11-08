import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import HumanPlayer from 'src/business/players/HumanPlayer';
import Game from 'src/business/Game';
import Gameboard from 'src/components/Gameboard';
import RandomBotPlayer from 'src/business/players/RandomBotPlayer';
import Player from 'src/business/Player';

const useStyles = createUseStyles({});

const App: React.FC = () => {
  const [game, setGame] = useState<Game>(() => new Game(15));
  const [blackPlayer, setBlackPlayer] = useState<HumanPlayer>(() => new HumanPlayer('Hessamoddin'));
  const [whitePlayer, setWhitePlayer] = useState<Player>(() => new RandomBotPlayer('Computer'));

  const styles = useStyles();

  return (
    <Gameboard
      game={game}
      blackPlayer={blackPlayer}
      whitePlayer={whitePlayer}
      onRoomSelect={selectedRoomPosition => {
        blackPlayer.informRoomSelect(selectedRoomPosition);
      }}
    ></Gameboard>
  );
};

export default App;
