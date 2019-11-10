import PlayerConfig from 'src/types/PlayerConfig';

export default interface Config {
  size: number;
  blackPlayerConfig: PlayerConfig;
  whitePlayerConfig: PlayerConfig;
}
