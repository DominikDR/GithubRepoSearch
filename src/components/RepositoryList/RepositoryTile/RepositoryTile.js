import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaStar, FaUser } from 'react-icons/fa';

import styles from './RepositoryTile.css';

const RepositoryTile = ({ user, repository, language, stars }) => (
    <div className={styles.repositoryBox}>
        <Link className={styles.repoName} to={{ pathname: `/details/${user}/${repository}` }}>
            <span>{repository}</span>
        </Link>
        <span className={styles.owner}>
            <FaUser className={styles.userIcon} />
            {`Owned by ${user}`}
        </span>
        <span className={styles.stars}>
            <FaStar className={styles.starIcon} />
            {stars}
        </span>
        <span>{language}</span>
    </div>
);

RepositoryTile.propTypes = {
    user: PropTypes.string,
    repository: PropTypes.string,
    language: PropTypes.string,
    stars: PropTypes.number,
};

export default RepositoryTile;
