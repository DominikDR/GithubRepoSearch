import React from 'react';
import styles from './OneLabel.css';

const OneLabel = ({ text, value }) => (
    <div className={styles.wrapperInfo}>
        <span className={styles.label}>{text}</span>
        <span className={styles.info}>{value}</span>
    </div>
);

export default OneLabel;
