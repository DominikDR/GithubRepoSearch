import React from 'react';
import { FaSearch, FaGithub } from 'react-icons/fa';
import styles from './SearchBar.css';

export default class SearchBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    handleSubmit = (event) => {
        const { searchedValue } = this.props;
        event.preventDefault();
        searchedValue(this.textInput.current.value);
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
