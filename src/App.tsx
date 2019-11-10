import React, { useState, Fragment } from 'react';
import { createUseStyles } from 'react-jss';
import Config from 'src/types/Config';
import ConfigForm from 'src/components/ConfigForm';
import BoardContainer from 'src/components/BoardContainer';

const useStyles = createUseStyles({
  resetButtonContainer: {
    margin: 20
  }
});

const App: React.FC = () => {
  const [config, setConfig] = useState<Config | null>(null);

  const styles = useStyles();

  return (
    <Fragment>
      {!config && <ConfigForm onSubmit={setConfig} />}
      {!!config && (
        <Fragment>
          <div className={styles.resetButtonContainer}>
            <button onClick={() => setConfig(null)}>Start a New Game</button>
          </div>
          <BoardContainer config={config} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default App;
