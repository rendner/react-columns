import React, {memo} from 'react';
import PropTypes from 'prop-types';

import {propTypes} from '../../../crystal';

import FallingCrystals from './animations/FallingCrystals';
import GameOverCountdown from './animations/GameOverCountdown';

const GameOverOverlay = ({matrixCrystals, onAnimationFinished}) => {
  return matrixCrystals && matrixCrystals.length ?
  <React.Fragment key={'fragment'}>
    <FallingCrystals
      key={'fallingCrystals'}
      delay={300}
      minCrystalDelay={45}
      matrixCrystals={matrixCrystals}
    />
    <GameOverCountdown
      key={'countdown'}
      delay={1000}
      onAnimationFinished={onAnimationFinished}
    />
  </React.Fragment>
    :
    null;
};

GameOverOverlay.propTypes = {
  matrixCrystals: propTypes.MATRIX_CRYSTAL_LIST,
  onAnimationFinished: PropTypes.func,
};

export default memo(GameOverOverlay);
