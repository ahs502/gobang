import React from 'react';
import { createUseStyles } from 'react-jss';
import GameboardContainer from 'src/components/GameboardContainer';

const useStyles = createUseStyles({});

const App: React.FC = () => {
  const styles = useStyles();

  return (
    <GameboardContainer
      size={15}
      blackPlayerDescriptor={{ mode: 'RANDOM_BOT', name: 'Computer' }}
      whitePlayerDescriptor={{ mode: 'HUMAN', name: 'Hessamoddin' }}
    />
  );
};

export default App;
