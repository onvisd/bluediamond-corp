import React, {Component, PropTypes} from 'react';

/**
 * Foodservice Contact form
 */
export default class FSRequestSample extends Component {
    static propTypes = {
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        company: PropTypes.string,
        message: PropTypes.string
    }

    render() {
        const {
            firstName,
            lastName,
            email,
            company,
            request
        } = this.props;

        return (
            <div>
                <p>
                    <strong>Name: </strong>
                    {firstName} {lastName}
                </p>
                <p>
                    <strong>Email: </strong>
                    {email || 'N/A'}
                </p>
                <p>
                    <strong>Company: </strong>
                    {company || 'Not provided.'}
                </p>
                <div>
                    <strong>Request: </strong>
                    <p>{request || 'No message provided.'}</p>
                </div>
            </div>
        );
    }
}
