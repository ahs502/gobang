import React, { useState, Fragment } from 'react';
import GameboardContainer from 'src/components/GameboardContainer';
import Configuration from 'src/types/Configuration';
import ConfigurationForm from 'src/components/ConfigurationForm';

const App: React.FC = () => {
  const [configuration, setConfiguration] = useState<Configuration | null>(null);

  return (
    <Fragment>
      {!configuration && <ConfigurationForm onSubmit={setConfiguration} />}
      {configuration && (
        <Fragment>
          <button onClick={() => setConfiguration(null)}>Start a New Game</button>
          <hr />
          <GameboardContainer configuration={configuration} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default App;
