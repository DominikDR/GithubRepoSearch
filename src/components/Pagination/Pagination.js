import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import PaginationComponent from './PaginationComponent';

class Pagination extends React.PureComponent {
    constructor(props) {
        super(props);
        this.inputRef = null;
    }

    changePage = (event) => {
        const { history } = this.props;
        event.preventDefault();
        const selectedPage = this.inputRef.value;
        const searchedRepoFromQuery = queryString.parse(history.location.search).q;
        history.push({
            pathname: '/results',
            search: `q=${searchedRepoFromQuery}&page=${selectedPage}`,
        });
    }

    setInputRef = (ref) => {
        this.inputRef = ref;
    }

    render() {
        const { parsedLinkHeader } = this.props;
        return (
            <div>
                <PaginationComponent
                    onChangePage={this.changePage}
                    setInputRef={this.setInputRef}
                    parsedLinkHeader={parsedLinkHeader}
                />
            </div>
        );
    }
}

export default withRouter(Pagination);
