import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';

export default class Settings extends Component {
    static propTypes = {
        address: PropTypes.object.isRequired,
        idx: PropTypes.number.isRequired,
        editingAddress: PropTypes.bool.isRequired,
        handleClick: PropTypes.func.isRequired
    }

    render() {
        const {address, idx, editingAddress, handleClick} = this.props;

        return (
            <div className={styles.container}>
                <div
                    className={classnames(styles.address, {
                        [styles.editing]: editingAddress[1] === idx,
                        [styles.hidden]:
                            editingAddress[1] !== undefined && // eslint-disable-line
                            editingAddress[1] !== idx
                    })}
                    key={address.node.address1}
                >
                    <span className={styles.name}>
                        {address.node.firstName} {address.node.lastName}
                    </span><br />
                    {address.node.address1}<br />
                    {address.node.city}, {address.node.provinceCode} {address.node.zip}<br />
                    {!editingAddress[0] && (
                        <a className={styles.edit} onClick={handleClick}>
                            Edit
                        </a>
                    )}
                </div>
            </div>
        );
    }
}
