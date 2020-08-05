import React, { useState } from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import styles from '../styles/CheckBox.module.scss';

export interface CheckBoxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  className: any;
  children?: string | JSX.Element | JSX.Element[];
}

const CheckBox = ({
  checked = false,
  onChange = (value: boolean) => {},
  className,
  children,
}: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div
      className={className}
      style={{ textAlign: 'center', cursor: 'pointer' }}
      onClick={() => {
        onChange(!isChecked);
        setIsChecked(!isChecked);
      }}
    >
      {checked ? (
        <MdCheckBox className={styles.Icon} />
      ) : (
        <MdCheckBoxOutlineBlank className={styles.Icon} />
      )}{' '}
      {children}
    </div>
  );
};

export default CheckBox;
