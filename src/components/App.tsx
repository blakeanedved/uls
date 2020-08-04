import React, { useState } from 'react';
import CheckBox from '../components/Checkbox';
import useInput from '../hooks/useInput';
import styles from '../styles/App.module.scss';

const App = () => {
  const suffix = useInput('');
  const url = useInput('');
  const [customSuffix, setCustomSuffix] = useState(true);
  // TODO implement loading and result display

  const handleSubmit = () => {
    fetch(`https://url-shortener-5a1b1.web.app/createNewLink`, {
      method: 'POST',
      body: JSON.stringify({ path: suffix, url }),
    }).then((data) => {
      console.log(data);
    });

    suffix.reset();
    url.reset();
  };

  const handleToggle = (value: boolean) => {
    setCustomSuffix(value);
  };

  return (
    <div className={styles.Card}>
      <input
        className={styles.Input}
        type="text"
        {...url.bind}
        placeholder="https://example.com/"
      />
      <input
        className={styles.Input}
        type="text"
        disabled={!customSuffix}
        {...suffix.bind}
        placeholder="Suffix"
      />
      <CheckBox
        checked={customSuffix}
        onChange={handleToggle}
        className={styles.CheckBox}
      >
        Custom Suffix
      </CheckBox>
      <button className={styles.Submit} onClick={handleSubmit}>
        Shorten Link
      </button>
    </div>
  );
};

export default App;
