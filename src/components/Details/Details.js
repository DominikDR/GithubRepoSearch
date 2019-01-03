import React from 'react';
import PropTypes from 'prop-types';
import styles from './Details.css';
import Description from './Description/Description';

export default class Details extends React.PureComponent {
    state = {
        repository: null,
    }

    componentDidMount() {
        this.fetchRepository().then((data) => {
            this.setState({
                repository: this.reduceRepoData(data),
            });
        });
    }

    fetchRepository = async () => {
        const { owner, repoName } = this.props.match.params; // eslint-disable-line react/destructuring-assignment
        const url = `https://api.github.com/repos/${owner}/${repoName}`;
        try {
            const response = await fetch(url, {
                method: 'get',
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    reduceRepoData = (data) => {
        const reducedRepoValues = {
            repository: data.name,
            user: data.owner.login,
            stars: data.stargazers_count,
            language: data.language,
            description: data.description,
            created: data.created_at.split('T')[0],
            updated: data.updated_at.split('T')[0],
            forks: data.forks_count,
            repoUrl: data.svn_url,
        };
        return reducedRepoValues;
    };

    renderDetails = (object) => {
        const details = Object.entries(object)
            .map(([label, value], index) => {
                if (label === 'repoUrl') {
                    // eslint-disable-next-line no-param-reassign
                    label = label.replace('repoUrl', 'Visit on Github');
                }
                return (
                    <Description
                        key={index}
                        text={label}
                        value={value}
                    />
                );
            });
        return details;
    }

    render() {
        const { repository } = this.state;
        return (
            <div className={styles.detailsContainer}>
                {repository ? this.renderDetails(repository) : <div>Loading repository...</div>}
            </div>
        );
    }
}

Details.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.node,
        }).isRequired,
    }).isRequired,
};
