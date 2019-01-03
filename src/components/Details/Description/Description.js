import React from 'react';
import PropTypes from 'prop-types';
import styles from './Description.css';

const Description = ({ text, value }) => (
    <div className={styles.wrapperInfo}>
        <span className={styles.label}>{text}</span>
        <span className={styles.info}>{value}</span>
    </div>
);

export default Description;

Description.propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};
