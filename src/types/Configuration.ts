export interface PlayerDescriptor {
  mode: 'HUMAN' | 'RANDOM_BOT';
  name: string;
  randomBot?: {
    delay: number;
  };
}

export default interface Configuration {
  size: 15 | 19;
  blackPlayerDescriptor: PlayerDescriptor;
  whitePlayerDescriptor: PlayerDescriptor;
}
