import React from 'react';
import PropTypes from 'prop-types';
import styles from './OneLabel.css';

const OneLabel = ({ text, value }) => (
    <div className={styles.wrapperInfo}>
        <span className={styles.label}>{text}</span>
        <span className={styles.info}>{value}</span>
    </div>
);

export default OneLabel;

OneLabel.propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};
