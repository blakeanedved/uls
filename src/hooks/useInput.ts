import { ChangeEvent, useState } from 'react';

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  return {
    bind: {
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      },
      value,
    },
    reset: () => setValue(initialValue),
    setValue,
    value,
  };
};

export default useInput;
