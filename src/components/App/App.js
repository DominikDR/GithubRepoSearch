import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.css';
import SearchBar from '../SearchBar/SearchBar';
import RepositoryList from '../RepositoryList/RepositoryList';
import Details from '../Details/Details';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.Component {
    render() {
        return (
            <div className={styles.mainPage}>
                <SearchBar />
                <Switch>
                    <Route
                        exact path="/results" // eslint-disable-line react/jsx-max-props-per-line
                        render={props => <RepositoryList {...props} />}
                    />
                    <Route path="/details/:owner/:repoName" component={Details} />
                </Switch>
            </div>
        );
    }
}
