import React, {PropTypes} from 'react';
import styles from './styles.module.css';

const flexAlign = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end'
};

const Story = ({image, tagline, content, align}) => (
    <div
        className={styles.container}
        style={{
            backgroundImage: `url(${image})`,
            alignItems: flexAlign[align.toLowerCase()]
        }}
    >
        <div className={styles.innerContainer}>
            <h2>{tagline}</h2>
            <p>{content}</p>
        </div>
    </div>
);

Story.propTypes = {
    image: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    align: PropTypes.string.isRequired
};

export default Story;
