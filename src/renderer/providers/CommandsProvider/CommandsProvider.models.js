import PropTypes from 'prop-types';

export const CommandShape = PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    shortcut: PropTypes.string,
    handler: PropTypes.func.isRequired,
});
