import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.css';
import SearchBar from '../SearchBar/SearchBar';
import RepositoryList from '../RepositoryList/RepositoryList';
import Details from '../Details/Details';

export default class App extends React.Component {
    state = {
        searchedRepository: '',
    };

    handleSearch = (searchedRepository) => {
        this.setState({
            searchedRepository,
        });
    }

    render() {
        return (
            <div className={styles.mainPage}>
                <SearchBar onSearch={this.handleSearch} />
                <Switch>
                    <Route
                        exact path="/results" // eslint-disable-line react/jsx-max-props-per-line
                        render={props => <RepositoryList searchedRepository={props} />}
                    />
                    <Route path="/details/:owner/:repoName" component={Details} />
                </Switch>
            </div>
        );
    }
}
