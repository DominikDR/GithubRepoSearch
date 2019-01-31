import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import parseLinkHeader from 'parse-link-header';
import queryString from 'query-string';
import RepositoryTile from './RepositoryTile/RepositoryTile';
import Pagination from '../Pagination/Pagination';

import styles from './RepositoryList.css';

export default class RepositoryList extends React.Component {
    state = {
        repositories: [],
        parsedLinkHeader: null,
    }

    componentDidMount() {
        this.fetchRepositories();
    }

    componentDidUpdate({ location: prevLocation }) {
        if (this.props.location.search !== prevLocation.search) {
            this.fetchRepositories();
        }
    }

    fetchRepositories = async () => {
        const { search } = this.props.location; // eslint-disable-line react/destructuring-assignment
        const parsedQuery = queryString.parse(search);
        const url = `https://api.github.com/search/repositories?q=${parsedQuery.q}&page=${parsedQuery.page}`;
		console.log('TCL: fetchRepositories -> url', url)
        try {
            const response = await fetch(url, {
                method: 'get',
            });
            const parsedLinkHeader = parseLinkHeader(`${response.headers.get('Link')}`);
            console.log('​RepositoryList -> parsedLinkHeader', parsedLinkHeader);
            const data = await response.json();
            this.setState({
                repositories: this.reduceRepoData(data),
                parsedLinkHeader,
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
        const { repositories, parsedLinkHeader } = this.state;
        return (
            <div className={styles.repositoryContainer}>
                {repositories.length
                    ? <>
                        {this.createRepositoryList()}
                        <Pagination
                            parsedLinkHeader={parsedLinkHeader}
                        />
                    </>
                    : <div>Loading please wait...</div>
                }
            </div>
        );
    }
}

RepositoryList.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string,
    }).isRequired,
};
