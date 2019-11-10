import React, { FC, useMemo } from 'react';
import Game from 'src/business/Game';
import Player from 'src/business/Player';
import Board from 'src/components/Board';
import Config from 'src/types/Config';
import PlayerConfig from 'src/types/PlayerConfig';
import HumanPlayer from 'src/business/players/HumanPlayer';
import RandomBotPlayer from 'src/business/players/RandomBotPlayer';

export interface BoardContainerProps {
  config: Config;
}

const BoardContainer: FC<BoardContainerProps> = ({ config: { size, blackPlayerConfig, whitePlayerConfig } }) => {
  const game = useMemo(() => new Game(size), [size]);
  const blackPlayer = useMemo(() => createPlayer(blackPlayerConfig), [blackPlayerConfig]);
  const whitePlayer = useMemo(() => createPlayer(whitePlayerConfig), [whitePlayerConfig]);

  return (
    <Board
      game={game}
      blackPlayer={blackPlayer}
      whitePlayer={whitePlayer}
      onClick={position => {
        blackPlayer instanceof HumanPlayer && blackPlayer.handleBoardClick(position);
        whitePlayer instanceof HumanPlayer && whitePlayer.handleBoardClick(position);
      }}
    />
  );

  /**
   * Creates an instance of Player out of the given player configuration.
   * @param playerConfig The specified player configuration.
   */
  function createPlayer(playerConfig: PlayerConfig): Player {
    if (playerConfig.type === 'HUMAN') return new HumanPlayer(playerConfig.name);
    if (playerConfig.type === 'RANDOM_BOT') return new RandomBotPlayer(playerConfig.name, playerConfig.delay);
    throw new Error(`Unsupported player mode.`);
  }
};

export default BoardContainer;
