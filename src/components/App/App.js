import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './App.css';
import SearchBar from '../SearchBar/SearchBar';

library.add(faSearch);

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
        console.log("value", searchedValue)
        const url = `https://api.github.com/search/repositories?q=${searchedValue}`;
        try {
            const response = await fetch(url, {
                method: 'get',
            });
            console.log('response', response.json());
            return response.json();
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    handleSearch = (searchedValue) => {
		console.log("​App -> handleSearch -> searchedValue", searchedValue)
        this.setState({
            searchedValue,
        });
    }

    render() {
        return (
            <div>
                <SearchBar searchedValue={this.handleSearch} />
            </div>
        );
    }
}
