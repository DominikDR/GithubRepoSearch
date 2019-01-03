import React from 'react';
import styles from './Details.css';

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
        const { owner, repoName } = this.props.match.params;
		console.log("​Details -> fetchRepository -> repoName", repoName)
		console.log("​Details -> fetchRepository -> owner", owner)
        const url = `https://api.github.com/repos/${owner}/${repoName}`;
        try {
            const response = await fetch(url, {
                method: 'get',
            });
            const data = await response.json();
            console.log("​fetchRepository -> data", data)
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    reduceRepoData = (data) => {
        const reducedRepoValues = {
            description: data.description,
            created: data.created_at,
            updated: data.updated_at,
            forksCount: data.forks_count,
            repoUrl: data.svn_url,
        };
        return reducedRepoValues;
    };

    render() {
        const { repository } = this.state;
		console.log("​Details ->repository", repository)
        let repoDetails;
        if (!repository) {
            repoDetails = (
                <div>Loading repository...</div>
            );
        } else {
            repoDetails = (
                <div>
                    <div>Details</div>
                    <span>Description: {repository.description}</span>
                </div>
            );
        }

        return (
            <div>
                {repoDetails}
            </div>
        );
    }
}
