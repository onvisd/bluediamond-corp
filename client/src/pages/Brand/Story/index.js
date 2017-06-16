import React, {PropTypes} from 'react';
import styles from './styles.module.css';

const flexAlign = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end'
};

const Story = ({image, tagline, content, verticalAlign, horizontalAlign, theme}) => (
    <div
        className={styles.container}
        style={{
            backgroundImage: `url(${image})`,
            alignItems: flexAlign[verticalAlign.toLowerCase()],
            textAlign: horizontalAlign.toLowerCase()
        }}
    >
        <div className={styles.innerContainer}>
            <h2 className={styles[`is${theme}`]} style={{textAlign: horizontalAlign.toLowerCase()}}>
                {tagline}
            </h2>
            {content && <p>{content}</p>}
        </div>
    </div>
);

Story.propTypes = {
    image: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    content: PropTypes.string,
    verticalAlign: PropTypes.string.isRequired,
    horizontalAlign: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired
};

export default Story;
