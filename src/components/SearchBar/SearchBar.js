import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FaSearch, FaGithub } from 'react-icons/fa';
import styles from './SearchBar.css';

class SearchBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    handleSubmit = (event) => {
        const { onSearch, history } = this.props;
        event.preventDefault();
        history.push('/');
        onSearch(this.textInput.current.value);
    }

    render() {
        return (
            <div className={styles.searchBarContainer}>
                <header className={styles.header}>
                    <FaGithub className={styles.githubIcon} />
                    <span className={styles.title}>Search for any Github repository</span>
                </header>
                <form className={styles.searchForm} onSubmit={this.handleSubmit}>
                    <input type="text" className={styles.searchInput} ref={this.textInput} placeholder="Type here" />
                    <button type="submit" className={styles.searchButton}>
                        <FaSearch className={styles.loupeIcon} />
                    </button>
                </form>
            </div>
        );
    }
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    history: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
    ]),
};

export default withRouter(SearchBar);
