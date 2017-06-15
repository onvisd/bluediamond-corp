import React from 'React';
import {Title as IsomorphicTitle} from 'react-isomorphic-render';

export default (props) => (
    <IsomorphicTitle>{`${props.children} | Blue Diamond`}</IsomorphicTitle>
);
