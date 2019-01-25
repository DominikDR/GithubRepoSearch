import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FaSearch, FaGithub } from 'react-icons/fa';
import styles from './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    handleSubmit = (event) => {
        const { history } = this.props;
        const searchedRepo = this.textInput.current.value;
        event.preventDefault();
        history.push({
            pathname: '/results',
            search: `q=${searchedRepo}`,
        });
    }

    render() {
        const { location: { search } } = this.props;
        const searchedRepo = search.split('=')[1];
        return (
            <div className={styles.searchBarContainer}>
                <header className={styles.header}>
                    <FaGithub className={styles.githubIcon} />
                    <span className={styles.title}>Search for any Github repository</span>
                </header>
                <form className={styles.searchForm} onSubmit={this.handleSubmit}>
                    <input
                        key={searchedRepo}
                        type="text"
                        className={styles.searchInput}
                        defaultValue={searchedRepo}
                        ref={this.textInput}
                        placeholder="Type here"
                    />
                    <button type="submit" className={styles.searchButton}>
                        <FaSearch className={styles.loupeIcon} />
                    </button>
                </form>
            </div>
        );
    }
}

SearchBar.propTypes = {
    history: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
    ]),
    location: PropTypes.shape({
        search: PropTypes.string,
    }).isRequired,
};

export default withRouter(SearchBar);
