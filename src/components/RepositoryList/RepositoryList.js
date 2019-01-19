import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './RepositoryList.css';

export default class RepositoryList extends React.PureComponent {
    state = {
        repositories: [],
    }

    componentDidMount() {
        this.fetchRepositories();
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
        const listOfRepositories = repositories.map(repo => (
            <div
                key={`${repo.login}${repo.name}`}
                className={styles.repositoryBox}
            >
                <Link to={{ pathname: `/details/${repo.login}/${repo.name}` }}>
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
