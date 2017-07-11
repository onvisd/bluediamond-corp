import React, {Component, PropTypes} from 'react';

export default class Contact extends Component {
    static propTypes = {
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        streetAddress: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        country: PropTypes.string,
        postalCode: PropTypes.string,
        lotCode: PropTypes.string,
        bestBeforeDate: PropTypes.string,
        timeStamp: PropTypes.string,
        upc: PropTypes.string,
        company: PropTypes.string,
        message: PropTypes.string,
        subject: PropTypes.string,
        inquiry: PropTypes.string
    }

    render() {
        const {
            firstName,
            lastName,
            email,
            streetAddress,
            city,
            state,
            country,
            postalCode,
            lotCode,
            bestBeforeDate,
            timeStamp,
            upc,
            company,
            message,
            subject,
            inquiry
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
                <div>
                    <strong>Address: </strong><br />
                    {streetAddress || 'N/A'}<br />
                    {city || 'N/A'}, {state || 'N/A'}, {country || 'N/A'} {postalCode || 'N/A'}
                </div>
                <p>
                    <strong>What is your inquiry regarding: </strong>
                    {subject || 'Not Provided'}
                </p>
                <p>
                    <strong>Product I am inquring about: </strong>
                    {inquiry || 'Not Provided'}
                </p>
                <p>
                    <strong>Lot Code: </strong>
                    {lotCode || 'Not Provided'}
                </p>
                <p>
                    <strong>Best Before Date: </strong>
                    {bestBeforeDate || 'Not Provided'}
                </p>
                <p>
                    <strong>Timestamp: </strong>
                    {timeStamp || 'Not Provided'}
                </p>
                <p>
                    <strong>UPC: </strong>
                    {upc || 'Not Provided'}
                </p>
                {company && (
                    <p>
                        <strong>Company: </strong>
                        {company}
                    </p>
                )}
                <div>
                    <strong>Message: </strong>
                    <p>{message || 'No message provided.'}</p>
                </div>
            </div>
        );
    }
}
