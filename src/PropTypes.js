import PropTypes from 'prop-types';

const Types = {
  ...PropTypes,
};

Types.connectionStatus = Types.oneOf(['unknown', 'error', 'hidden', 'default']);

export default Types;
