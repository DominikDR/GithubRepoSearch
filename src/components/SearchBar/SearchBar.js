import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SearchBar.css';

export default class SearchBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    handleSubmit = (event) => {
        const { onSearch } = this.props;
        event.preventDefault();
        onSearch(this.textInput.current.value);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" className="input" ref={this.textInput} placeholder="Search" />
                    <button type="submit" className={styles.searchButton}>
                        <FontAwesomeIcon icon="search" />
                    </button>
                </form>
            </div>
        );
    }
}
