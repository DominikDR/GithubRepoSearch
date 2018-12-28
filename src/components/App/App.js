import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './App.css';
import SearchBar from '../SearchBar/SearchBar';
import RepositoryInfo from '../RepositoryInfo/RepositoryInfo';

library.add(faSearch);

export default class App extends React.Component {
    state = {
        onSearch: '',
        repositories: [],
    };

    componentDidUpdate(prevProps, prevState) {
        const { onSearch } = this.state;
        if (onSearch !== prevState.onSearch) {
            this.fetchRepos().then((data) => {
                this.setState({
                    repositories: data,
                });
            });
        }
    }

    fetchRepos = async () => {
        const { onSearch } = this.state;
        const url = `https://api.github.com/search/repositories?q=${onSearch}&page=1`;
        try {
            const response = await fetch(url, {
                method: 'get',
            });
            const data = await response.json();
            const partOfData = data.items.map((repo) => {
                const pickedProperties = {
                    name: repo.name,
                    login: repo.owner.login,
                    stars: repo.stargazers_count,
                    language: repo.language,
                    details: {
                        description: repo.description,
                        created: repo.created_at,
                        forksCount: repo.forks_count,
                        repoUrl: repo.svn_url,
                    },
                };
                return pickedProperties;
            });
            return partOfData;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    handleSearch = (onSearch) => {
        this.setState({
            onSearch,
        });
    }

    render() {
        const { repositories } = this.state;
        return (
            <div className={styles.mainPage}>
                <SearchBar onSearch={this.handleSearch} />
                <RepositoryInfo repositories={repositories} />
            </div>
        );
    }
}
