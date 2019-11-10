import React, { FC, useState, Fragment } from 'react';
import { createUseStyles } from 'react-jss';
import Config from 'src/types/Config';
import PlayerConfig from 'src/types/PlayerConfig';

const useStyles = createUseStyles({
  root: {
    margin: 20
  }
});

export interface ConfigFormProps {
  onSubmit(config: Config): void;
}

const ConfigForm: FC<ConfigFormProps> = ({ onSubmit }) => {
  const [config, setConfig] = useState<Config>({
    size: 15,
    blackPlayerConfig: {
      type: 'HUMAN',
      name: 'Hessamoddin'
    },
    whitePlayerConfig: {
      type: 'RANDOM_BOT',
      name: 'Computer',
      delay: 400
    }
  });

  const styles = useStyles();

  const generalForm = (
    <div>
      Size:&nbsp;
      <select
        value={config.size.toString()}
        onChange={event => setConfig({ ...config, size: Number(event.target.value) })}
      >
        <option value="11">11 ⨯ 11</option>
        <option value="15">15 ⨯ 15</option>
        <option value="19">19 ⨯ 19</option>
      </select>
    </div>
  );

  function playerConfigForm(
    title: 'Black' | 'White',
    playerConfig: PlayerConfig,
    onChange: (playerConfig: PlayerConfig) => void
  ): JSX.Element {
    return (
      <div>
        {title} Player:
        <br />
        Mode:&nbsp;
        <select
          value={playerConfig.type}
          onChange={({ target: { value: type } }) =>
            onChange(
              type === 'HUMAN'
                ? { ...playerConfig, type }
                : type === 'RANDOM_BOT'
                ? { ...playerConfig, type, delay: 400 }
                : playerConfig
            )
          }
        >
          <option value="HUMAN">Human</option>
          <option value="RANDOM_BOT">Random Bot</option>
        </select>
        <br />
        Name:&nbsp;
        <input
          value={playerConfig.name}
          onChange={({ target: { value: name } }) => onChange({ ...playerConfig, name })}
        />
        {playerConfig.type === 'RANDOM_BOT' && (
          <Fragment>
            <br />
            Delay:&nbsp;
            <input
              value={playerConfig.delay.toString()}
              onChange={event =>
                onChange({
                  ...playerConfig,
                  type: 'RANDOM_BOT',
                  delay: Number(event.target.value)
                })
              }
            />
          </Fragment>
        )}
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {generalForm}
      <br />
      {playerConfigForm('Black', config.blackPlayerConfig, blackPlayerConfig =>
        setConfig({ ...config, blackPlayerConfig })
      )}
      <br />
      {playerConfigForm('White', config.whitePlayerConfig, whitePlayerConfig =>
        setConfig({ ...config, whitePlayerConfig })
      )}
      <br />
      <button onClick={() => onSubmit(config)}>Start Game</button>
    </div>
  );
};

export default ConfigForm;
