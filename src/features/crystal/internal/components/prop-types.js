import PropTypes from 'prop-types';

export const CRYSTAL = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
});

export const MATRIX_INDEX = PropTypes.shape({
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
});

export const MATRIX_CRYSTAL = PropTypes.shape({
  crystal: CRYSTAL.isRequired,
  index: MATRIX_INDEX.isRequired,
});

export const MATRIX_CRYSTAL_LIST = PropTypes.arrayOf(MATRIX_CRYSTAL);
