import React, { FC, useMemo } from 'react';
import Game from 'src/business/Game';
import Player from 'src/business/Player';
import Gameboard from 'src/components/Gameboard';
import HumanPlayer from 'src/business/players/HumanPlayer';
import RandomBotPlayer from 'src/business/players/RandomBotPlayer';

export interface PlayerDescriptor {
  mode: 'HUMAN' | 'RANDOM_BOT';
  name: string;
}

export interface GameboardContainerProps {
  size: Game['size'];
  blackPlayerDescriptor: PlayerDescriptor;
  whitePlayerDescriptor: PlayerDescriptor;
}

const GameboardContainer: FC<GameboardContainerProps> = ({ size, blackPlayerDescriptor, whitePlayerDescriptor }) => {
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

  function createPlayer({ mode, name }: PlayerDescriptor): Player {
    if (mode === 'HUMAN') return new HumanPlayer(name);
    if (mode === 'RANDOM_BOT') return new RandomBotPlayer(name);
    throw new Error(`Unsupported player mode: '${mode}'.`);
  }
};

export default GameboardContainer;
