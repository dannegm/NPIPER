import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/no-danger */
const DangerouslyHtml = ({ children }) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: children,
            }}
        />
    );
};

DangerouslyHtml.propTypes = {
    children: PropTypes.string.isRequired,
};

export default DangerouslyHtml;
