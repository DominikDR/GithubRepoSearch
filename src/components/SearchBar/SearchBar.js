import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                <form className={styles.searchForm} onSubmit={this.handleSubmit}>
                    <input type="text" className={styles.searchInput} ref={this.textInput} placeholder="Search" />
                    <button type="submit" className={styles.searchButton}>
                        <FontAwesomeIcon className={styles.loupeIcon} icon="search" />
                    </button>
                </form>
            </div>
        );
    }
}
