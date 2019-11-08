import React, { FC, useState, Fragment } from 'react';
import Configuration, { PlayerDescriptor } from 'src/types/Configuration';

export interface ConfigurationFormProps {
  onSubmit(configuration: Configuration): void;
}

const ConfigurationForm: FC<ConfigurationFormProps> = ({ onSubmit }) => {
  const [configuration, setConfiguration] = useState<Configuration>(() => ({
    size: 15,
    blackPlayerDescriptor: {
      mode: 'HUMAN',
      name: 'Hessamoddin'
    },
    whitePlayerDescriptor: {
      mode: 'RANDOM_BOT',
      name: 'Computer',
      randomBot: {
        delay: 400
      }
    }
  }));

  const generalSection = (
    <div>
      Size:&nbsp;
      <select
        value={configuration.size.toString()}
        onChange={({ target: { value: size } }) =>
          setConfiguration({ ...configuration, size: Number(size) as Configuration['size'] })
        }
      >
        <option value="13">13 ⨯ 13</option>
        <option value="15">15 ⨯ 15</option>
        <option value="19">19 ⨯ 19</option>
      </select>
    </div>
  );

  const blackPlayerSection = (
    <div>
      Black Player:
      <br />
      Mode:&nbsp;
      <select
        value={configuration.blackPlayerDescriptor.mode}
        onChange={({ target: { value: mode } }) =>
          setConfiguration({
            ...configuration,
            blackPlayerDescriptor: { ...configuration.blackPlayerDescriptor, mode: mode as PlayerDescriptor['mode'] }
          })
        }
      >
        <option value="HUMAN">Human</option>
        <option value="RANDOM_BOT">Random Bot</option>
      </select>
      <br />
      Name:&nbsp;
      <input
        value={configuration.blackPlayerDescriptor.name}
        onChange={({ target: { value: name } }) =>
          setConfiguration({
            ...configuration,
            blackPlayerDescriptor: { ...configuration.blackPlayerDescriptor, name }
          })
        }
      />
      {configuration.blackPlayerDescriptor.mode === 'RANDOM_BOT' && (
        <Fragment>
          <br />
          Delay:&nbsp;
          <input
            value={
              (configuration.blackPlayerDescriptor.randomBot &&
                configuration.blackPlayerDescriptor.randomBot.delay.toString()) ||
              ''
            }
            onChange={({ target: { value: delay } }) =>
              setConfiguration({
                ...configuration,
                blackPlayerDescriptor: { ...configuration.blackPlayerDescriptor, randomBot: { delay: Number(delay) } }
              })
            }
          />
        </Fragment>
      )}
    </div>
  );

  const whitePlayerSection = (
    <div>
      White Player:
      <br />
      Mode:&nbsp;
      <select
        value={configuration.whitePlayerDescriptor.mode}
        onChange={({ target: { value: mode } }) =>
          setConfiguration({
            ...configuration,
            whitePlayerDescriptor: { ...configuration.whitePlayerDescriptor, mode: mode as PlayerDescriptor['mode'] }
          })
        }
      >
        <option value="HUMAN">Human</option>
        <option value="RANDOM_BOT">Random Bot</option>
      </select>
      <br />
      Name:&nbsp;
      <input
        value={configuration.whitePlayerDescriptor.name}
        onChange={({ target: { value: name } }) =>
          setConfiguration({
            ...configuration,
            whitePlayerDescriptor: { ...configuration.whitePlayerDescriptor, name }
          })
        }
      />
      {configuration.whitePlayerDescriptor.mode === 'RANDOM_BOT' && (
        <Fragment>
          <br />
          Delay:&nbsp;
          <input
            value={
              (configuration.whitePlayerDescriptor.randomBot &&
                configuration.whitePlayerDescriptor.randomBot.delay.toString()) ||
              ''
            }
            onChange={({ target: { value: delay } }) =>
              setConfiguration({
                ...configuration,
                whitePlayerDescriptor: { ...configuration.whitePlayerDescriptor, randomBot: { delay: Number(delay) } }
              })
            }
          />
        </Fragment>
      )}
    </div>
  );

  return (
    <div style={{ margin: '20px' }}>
      {generalSection}
      <br />
      {blackPlayerSection}
      <br />
      {whitePlayerSection}
      <br />
      <button onClick={() => onSubmit(configuration)}>Start Game</button>
    </div>
  );
};

export default ConfigurationForm;
