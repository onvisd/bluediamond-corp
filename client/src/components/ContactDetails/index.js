import React, {PropTypes} from 'react';
import marked from 'marked';

import styles from './styles.module.css';

const renderMarkup = (field) => ({__html: marked(field)});

const ContactDetails = ({data}) => (
    <ul className={styles.container}>
        {data.map((d) => (
            <li className={styles.detail} key={d._id}>
                <h4>{d.title}</h4>
                <div dangerouslySetInnerHTML={renderMarkup(d.details)} />
            </li>
        ))}
    </ul>
);

ContactDetails.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        details: PropTypes.string.isRequired
    }))
};

export default ContactDetails;
