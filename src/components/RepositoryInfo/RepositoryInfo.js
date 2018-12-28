import React from 'react';
import styles from './RepositoryInfo.css';
import OneLabel from './OneLabel/OneLabel';

const RepositoryInfo = ({ repositories }) => {
    const mappedRepositories = repositories.map((repo, index) => (
        <div
            key={`${index}${repo.login}`}
            className={styles.repositoryBox}
        >
            <span className={styles.name}>{repo.name}</span>
            <span className={styles.owner}>{'Owned by'} '{repo.login}'</span>
            <span className={styles.stars}>{repo.stars} {'stars'}</span>
            <span>{repo.language}</span>
        </div>
    ));
    return (
        <div className={styles.repositoryContainer}>
            { mappedRepositories }
        </div>
    );
};

export default RepositoryInfo;
