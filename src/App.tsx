import React, { useState, Fragment } from 'react';
import GameboardContainer from 'src/components/GameboardContainer';
import Configuration from 'src/types/Configuration';
import ConfigurationForm from 'src/components/ConfigurationForm';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  resetButtonContainer: {
    margin: 20
  }
});

const App: React.FC = () => {
  const [configuration, setConfiguration] = useState<Configuration | null>(null);

  const styles = useStyles();

  return (
    <Fragment>
      {!configuration && <ConfigurationForm onSubmit={setConfiguration} />}
      {configuration && (
        <Fragment>
          <div className={styles.resetButtonContainer}>
            <button onClick={() => setConfiguration(null)}>Start a New Game</button>
          </div>
          <GameboardContainer configuration={configuration} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default App;
