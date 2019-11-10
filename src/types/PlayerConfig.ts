interface GeneralPlayerConfig {
  name: string;
}

interface HumanPlayerSpecificConfig {
  type: 'HUMAN';
}
interface RandomBotPlayerSpecificConfig {
  type: 'RANDOM_BOT';
  delay: number;
}

type PlayerConfig = GeneralPlayerConfig & (HumanPlayerSpecificConfig | RandomBotPlayerSpecificConfig);

export default PlayerConfig;
