import React from 'react';
import styles from './App.css';
import SearchBar from '../SearchBar/SearchBar';

export default class App extends React.Component {
    state = {
        searchedValue: '',
    };

    componentDidUpdate(prevState) {
        const { searchedValue } = this.state;
        if (searchedValue !== prevState.searchedValue) {
            this.fetchRepos(searchedValue);
        }
    }

    fetchRepos = async () => {
        const { searchedValue } = this.state;
        const url = `https://api.github.com/search/repositories?q=${searchedValue}`;
        try {
            const response = await fetch(url, {
                method: 'get',
            });
            return response.json();
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    handleSearch = (searchedValue) => {
        this.setState({
            searchedValue,
        });
    }

    render() {
        return (
            <div className={styles.mainPage}>
                <SearchBar searchedValue={this.handleSearch} />
            </div>
        );
    }
}
