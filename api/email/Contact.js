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
                <strong>First Name: </strong> {firstName}<br />
                <strong>Last Name: </strong> {lastName}<br />
                <strong>Email: </strong> {email || 'N/A'}<br />
                <strong>Address: </strong> {streetAddress || 'N/A'}<br />
                <strong>City: </strong> {city || 'N/A'}<br />
                <strong>State/Province: </strong> {state || 'N/A'}<br />
                <strong>Postal Code: </strong> {postalCode || 'N/A'}<br />
                <strong>Country: </strong> {country || 'N/A'}<br />
                <strong>What is your inquiry regarding: </strong> {subject || 'Not Provided'}<br />
                <strong>Product I am inquring about: </strong> {inquiry || 'Not Provided'}<br />
                <strong>Lot Code: </strong> {lotCode || 'Not Provided'}<br />
                <strong>Best Before Date: </strong> {bestBeforeDate || 'Not Provided'}<br />
                <strong>Timestamp: </strong> {timeStamp || 'Not Provided'}<br />
                <strong>UPC: </strong> {upc || 'Not Provided'}<br />
                {company && (
                    <div>
                        <strong>Company: </strong> {company}<br />
                    </div>
                )}
                <strong>Message: </strong><br />
                {message || 'No message provided.'}
            </div>
        );
    }
}
