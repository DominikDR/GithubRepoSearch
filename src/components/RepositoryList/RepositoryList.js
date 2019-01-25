import React from 'react';
import PropTypes from 'prop-types';
import RepositoryTile from './RepositoryTile/RepositoryTile';

import styles from './RepositoryList.css';

export default class RepositoryList extends React.Component {
    state = {
        repositories: [],
    }

    componentDidMount() {
        this.fetchRepositories();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.fetchRepositories();
        }
    }

    fetchRepositories = async () => {
        const { search } = this.props.location; // eslint-disable-line react/destructuring-assignment
        const url = `https://api.github.com/search/repositories${search}&page=1`;
        try {
            const response = await fetch(url, {
                method: 'get',
            });
            const data = await response.json();
            this.setState({
                repositories: this.reduceRepoData(data),
            });
        } catch (error) {
            console.error(error);
        }
    }

    reduceRepoData = (data) => {
        const reducedRepos = data.items.map((repo) => {
            const pickedProperties = {
                name: repo.name,
                login: repo.owner.login,
                stars: repo.stargazers_count,
                language: repo.language,
            };
            return pickedProperties;
        });
        return reducedRepos;
    }

    createRepositoryList = () => {
        const { repositories } = this.state;
        return repositories.map(repo => (
            <RepositoryTile
                key={`${repo.login}${repo.name}`}
                user={repo.login}
                repository={repo.name}
                language={repo.language}
                stars={repo.stars}
            />
        ));
    }

    render() {
        const { repositories } = this.state;
        return (
            <div className={styles.repositoryContainer}>
                {repositories.length ? this.createRepositoryList() : <div>Loading please wait...</div>}
            </div>
        );
    }
}

RepositoryList.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string,
    }).isRequired,
};
