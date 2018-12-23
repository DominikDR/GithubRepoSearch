import React from 'react';
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
            console.log('data', data);
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
            console.log('partOfData', partOfData);
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
        return (
            <div className={styles.mainPage}>
                <SearchBar onSearch={this.handleSearch} />
                <RepositoryInfo repositories={this.state.repositories} />
            </div>
        );
    }
}
