import React from 'react';
import styles from './OneLabel.css';

const OneLabel = ({ value, text}) => (
    <div className={styles.wrapperInfo}>
        <span className={styles.info}>{value}</span>
        <span className={styles.label}>{text}</span>
    </div>
);

export default OneLabel;
