import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import queryString from 'query-string';

const PaginationComponent = ({ onChangePage, setInputRef, parsedLinkHeader, location }) => {
    const searchedRepoFromQuery = queryString.parse(location.search).q;
    const actualPageFromQuery = queryString.parse(location.search).page;
    const backPageButton = parsedLinkHeader.prev
        ? (
            <Link
                to={{
                    pathname: '/results',
                    search: `?q=${searchedRepoFromQuery}&page=${parsedLinkHeader.prev.page}`,
                }}
            >
                <MdKeyboardArrowLeft />
            </Link>
        )
        : '';
    const nextPageButton = parsedLinkHeader.next
        ? (
            <Link
                to={{
                    pathname: '/results',
                    search: `?q=${searchedRepoFromQuery}&page=${parsedLinkHeader.next.page}`,
                }}
            >
                <MdKeyboardArrowRight />
            </Link>
        )
        : '';
    const lastPageInfo = parsedLinkHeader.last
        ? <span>{`from ${parsedLinkHeader.last.page}`}</span>
        : '';
    return (
        <div>
            {backPageButton}
            <form onSubmit={onChangePage}>
                <input
                    key={actualPageFromQuery}
                    ref={setInputRef}
                    type="number"
                    defaultValue={actualPageFromQuery}
                    min="1"
                />
            </form>
            {lastPageInfo}
            {nextPageButton}
        </div>
    );
};

export default withRouter(PaginationComponent);
