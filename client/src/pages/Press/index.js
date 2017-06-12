import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';
import moment from 'moment';

import {connector, getPress} from '../../redux/press';
import {parseModel} from '../../tools/parseApi';

import ExternalLink from '../../../assets/images/icons/external-link.svg';
import Button from '../../components/Button';
import styles from './styles.module.css';

@preload(({dispatch}) => dispatch(getPress()))
@connect(
    (state) => ({...connector(state.press)}),
    {getPress}
)
export default class Press extends Component {
    static propTypes = {
        contact: PropTypes.shape({
            items: PropTypes.arrayOf(PropTypes.shape({
                fields: PropTypes.shape({
                    pressReleases: PropTypes.arrayOf(PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    })),
                    documents: PropTypes.arrayOf(PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    })),
                    contactDetail: PropTypes.string.isRequired
                })
            })),
            includes: PropTypes.shape({
                Entry: PropTypes.arrayOf(PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                }))
            })
        })
    }

    state = {
        pressReleasesPage: 1,
        documentsPage: 1
    }

    handleLoadMore = (key) => {
        this.setState((state) => ({
            [`${key}Page`]: state[`${key}Page`] + 1
        }));
    }

    render() {
        const {pressReleasesPage, documentsPage} = this.state;
        const {press} = this.props;
        const {pressReleases, documents, contactDetail} = parseModel(press)[0].fields;

        return (
            <section className="content">
                <Title>Press</Title>

                <div className={styles.container}>
                    <div className={styles.main}>
                        <h1>News Releases</h1>
                        <ul className={styles.list}>
                            {pressReleases.splice(0, pressReleasesPage * 5)
                                .map((pressRelease) =>
                                <li className={styles.pressRelease} key={pressRelease._id}>
                                    <p className={styles.date}>
                                        {moment(pressRelease.date).format('L')}
                                    </p>
                                    <h2>{pressRelease.title}</h2>
                                    <p>
                                        {pressRelease.summary}
                                        <a href={pressRelease.url}> Read More <ExternalLink /></a>
                                    </p>
                                </li>
                            )}
                        </ul>
                        {pressReleasesPage * 5 < pressReleases.length &&
                            <Button
                                layout="wide"
                                onClick={() => this.handleLoadMore('pressReleases')}
                            >
                                Load More Press
                            </Button>
                        }
                        <h1>Documents</h1>
                        <ul className={styles.bulletList}>
                            {documents.splice(0, documentsPage * 5).map((doc) =>
                                <li className={styles.document} key={doc._id}>
                                    <a href={doc.media.file.url} target="_blank">
                                        {doc.title}
                                    </a>
                                </li>
                            )}
                        </ul>
                        {documentsPage * 5 < documents.length &&
                            <Button
                                layout="wide"
                                onClick={() => this.handleLoadMore('documents')}
                            >
                                Load More Documents
                            </Button>
                        }
                    </div>
                    <div className={styles.sidebar}>
                        <h1>Contact</h1>
                        <p>{contactDetail}</p>
                    </div>
                </div>
            </section>
        );
    }
}
