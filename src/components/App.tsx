import React, { useState } from 'react';
import CheckBox from '../components/Checkbox';
import useInput from '../hooks/useInput';
import styles from '../styles/App.module.scss';

const App = () => {
  const suffix = useInput('');
  const url = useInput('');
  const [customSuffix, setCustomSuffix] = useState(true);
  const [status, setStatus] = useState(
    <p className={styles.Status} style={{ color: 'black' }}>
      URL Shortener
    </p>
  );

  const handleSubmit = () => {
    setStatus(
      <p className={styles.Status} style={{ color: 'gray' }}>
        Loading...
      </p>
    );

    fetch(`https://url-shortener-5a1b1.web.app/createNewLink`, {
      // fetch(`http://localhost:5000/createNewLink`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        customSuffix
          ? { suffix: suffix.value, url: url.value }
          : { url: url.value, autoSuffix: true }
      ),
    }).then((res) => {
      res.json().then((data) => {
        if (data.error) {
          return setStatus(
            <p className={styles.Status} style={{ color: 'red' }}>
              {data.error}
            </p>
          );
        }

        setStatus(
          <p className={styles.Status} style={{ color: 'gray' }}>
            <a href={data.url}>{data.url}</a> created!
          </p>
        );
      });
    });

    suffix.reset();
    url.reset();
  };

  const handleToggle = (value: boolean) => {
    setCustomSuffix(value);
  };

  return (
    <div className={styles.Card}>
      {status}
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
