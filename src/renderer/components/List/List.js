import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const List = ({ component: Component, items }) => {
    return (
        <>
            {items.map((item, index) => {
                const hash = nanoid();
                if (typeof item === 'object') {
                    return <Component key={hash} hash={hash} index={index} {...item} />;
                }
                return <Component key={hash} hash={hash} index={index} item={item} />;
            })}
        </>
    );
};

List.propTypes = {
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    component: PropTypes.elementType.isRequired,
};

export default List;
