import React, { FC, useMemo } from 'react';
import Game from 'src/business/Game';
import Player from 'src/business/Player';
import Gameboard from 'src/components/Gameboard';
import HumanPlayer from 'src/business/players/HumanPlayer';
import RandomBotPlayer from 'src/business/players/RandomBotPlayer';
import Configuration, { PlayerDescriptor } from 'src/types/Configuration';

export interface GameboardContainerProps {
  configuration: Configuration;
}

const GameboardContainer: FC<GameboardContainerProps> = ({
  configuration: { size, blackPlayerDescriptor, whitePlayerDescriptor }
}) => {
  const game = useMemo<Game>(() => new Game(size), [size]);
  const blackPlayer = useMemo<Player>(() => createPlayer(blackPlayerDescriptor), [
    blackPlayerDescriptor.mode,
    blackPlayerDescriptor.name
  ]);
  const whitePlayer = useMemo<Player>(() => createPlayer(whitePlayerDescriptor), [
    whitePlayerDescriptor.mode,
    whitePlayerDescriptor.name
  ]);

  return (
    <Gameboard
      game={game}
      blackPlayer={blackPlayer}
      whitePlayer={whitePlayer}
      onRoomSelect={selectedRoomPosition => {
        blackPlayer instanceof HumanPlayer && blackPlayer.informRoomSelect(selectedRoomPosition);
        whitePlayer instanceof HumanPlayer && whitePlayer.informRoomSelect(selectedRoomPosition);
      }}
    />
  );

  function createPlayer({ mode, name, randomBot }: PlayerDescriptor): Player {
    if (mode === 'HUMAN') return new HumanPlayer(name);
    if (mode === 'RANDOM_BOT') {
      if (!randomBot) throw new Error('Randome bot special configs are not provided.');
      return new RandomBotPlayer(name, randomBot.delay);
    }
    throw new Error(`Unsupported player mode: '${mode}'.`);
  }
};

export default GameboardContainer;
