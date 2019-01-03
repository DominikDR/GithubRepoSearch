import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './RepositoryList.css';

export default class RepositoryList extends React.Component {
    state = {
        repositories: [],
    }

    componentDidMount() {
        this.fetchRepositories();
    }

    componentDidUpdate(prevProps) {
        const { searchedRepository } = this.props;
        const { repositories } = this.state;
        if (searchedRepository !== prevProps.searchedRepository || !repositories.length) {
            this.fetchRepositories();
        }
    }

    fetchRepositories = async () => {
        const { searchedRepository } = this.props;
        if (!searchedRepository) return;
        const url = `https://api.github.com/search/repositories?q=${searchedRepository}&page=1`;
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
        const listOfRepositories = repositories.map(repo => (
            <div
                key={`${repo.login}${repo.name}`}
                className={styles.repositoryBox}
            >
                <Link to={`/details/${repo.login}/${repo.name}`}>
                    <span className={styles.repoName}>{repo.name}</span>
                </Link>
                <span className={styles.owner}>Owned by {repo.login}</span>
                <span className={styles.stars}>{repo.stars} stars</span>
                <span>{repo.language}</span>
            </div>
        ));
        return listOfRepositories;
    }

    render() {
        return (
            <div className={styles.repositoryContainer}>
                {this.createRepositoryList()}
            </div>
        );
    }
}

RepositoryList.propTypes = {
    searchedRepository: PropTypes.string.isRequired,
};
