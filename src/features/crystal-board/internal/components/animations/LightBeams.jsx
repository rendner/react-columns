import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Spring, animated} from 'react-spring/renderprops';

import {
  propTypes,
  constants as crystalConstants,
} from '../../../../crystal';
import {
  convertColumnIndexToX,
  convertRowIndexToY,
} from '../../utils';
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
} from '../../constants';

const generateLightBeamPoints = (length) => {
  const h = 60;
  return `0,0 ${length},${-(h / 2)} ${length},${+(h / 2)}`;
};

const renderLightBeams = (length) => {
  const points = generateLightBeamPoints(length);
  return [0, 90, 180, 270].map((rotation) => <polygon
    key={rotation}
    fill="yellow"
    fillOpacity="0.7"
    transform={`rotate(${rotation} 0 0)`}
    points={points} />);
};

const LightBeams = ({matrixCrystal, duration, onAnimationFinished}) => {
  const {index} = matrixCrystal;
  const halfCellSize = crystalConstants.CELL_SIZE / 2;
  const x = convertColumnIndexToX(index.column) + halfCellSize;
  const y = convertRowIndexToY(index.row) + halfCellSize;

  return <Spring
    native
    reset
    from={{value: 0}}
    to={{value: 1}}
    config={{tension: 1200, friction: 80, duration: duration}}
    onRest={onAnimationFinished}>
    {
      ({value}) => <svg width={BOARD_WIDTH} height={BOARD_HEIGHT}>
        <g transform={`translate(${x},${y})`}>
          <animated.g style={{
            opacity: value.interpolate((v) => v >= 1 ? 0 : 1),
            transform: value.interpolate((v) => `rotate(${Math.round(v * 360)}deg)`),
          }}>
            {
              renderLightBeams(BOARD_HEIGHT + crystalConstants.CELL_SIZE)
            }
          </animated.g>
        </g>
      </svg>
    }
  </Spring>;
};

LightBeams.propTypes = {
  matrixCrystal: propTypes.MATRIX_CRYSTAL.isRequired,
  duration: PropTypes.number,
  onAnimationFinished: PropTypes.func,
};

LightBeams.defaultProps = {
  duration: 500,
  onAnimationFinished: undefined,
};

export default memo(LightBeams);
