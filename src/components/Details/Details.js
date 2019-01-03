import React from 'react';
import styles from './Details.css';
import OneLabel from './OneLabel/OneLabel';

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
            .map(([description, value], index) => {
                if (description === 'repoUrl') {
                    // eslint-disable-next-line no-param-reassign
                    description = description.replace('repoUrl', 'Visit on Github');
                }
                return (
                    <OneLabel
                        key={index}
                        text={description}
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
