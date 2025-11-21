import React from 'react';
import styles from './SearchBar.module.css';

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
