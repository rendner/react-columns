import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {
  Spring,
  animated,
  interpolate,
} from 'react-spring/renderprops';

import Easing from '../../../../utils/Easing';
import {
  constants as crystalBoardDomainConstants,
} from '../../../../../domains/crystal-board';

import CrystalSprite, {
  propTypes,
  constants as crystalConstants,
} from '../../../../crystal';

// time-per-row-increment
const rowProgressIncrement = 1 / (crystalBoardDomainConstants.ROW_COUNT - 1);
// time-per-column-increment
const columnProgressIncrement = 1 / (crystalBoardDomainConstants.COLUMNS_PER_ROW - 1);
// total amount of extra time for all rows
// for each row a slice of this time will be consumed
const rowsDuration = crystalBoardDomainConstants.ROW_COUNT * 100;
// total amount of extra time for all columns of a single row
// for each column a slice of this time will be consumed
const columnsDuration = crystalBoardDomainConstants.COLUMNS_PER_ROW * 60;
// extra weight which is added to the delay of a column
const columnExtraWeights = [1, -0.1, 0, 0, 0, 0, 0];
// the offscreen target position
const targetYPosition = (crystalBoardDomainConstants.ROW_COUNT + 1) * crystalConstants.CELL_SIZE;

const computeDelays = (matrixCrystals, startDelay, minCrystalDelay) => {
  return matrixCrystals.map(({index}) => {
    const rowDelay = rowsDuration * Easing.easeOutQuad(index.row * rowProgressIncrement);
    const time = (index.column * columnProgressIncrement) + columnExtraWeights[index.column];
    const crystalDelay = minCrystalDelay + (columnsDuration * Easing.linear(time));
    return startDelay + rowDelay + crystalDelay;
  });
};

const FallingCrystals = ({matrixCrystals, delay, minCrystalDelay, animationFinishedHandler}) => {
  const delays = computeDelays(matrixCrystals, delay, minCrystalDelay);
  const indexOfMaxDelay = delays.reduce((maxIndex, entry, valueIndex, array) =>
   entry > array[maxIndex] ? valueIndex : maxIndex, 0);
  const lastCrystalIndex = matrixCrystals.length - 1;
  return matrixCrystals.map((matrixCrystal, i) => {
    // The expected order of the crystals is from left to right and from top to
    // bottom. The rendering order of the crystals is reversed so that the
    // bottom crystals are rendered first --> falling crystals (falling from
    // top to bottom) will be in front of the crystals that have not yet fallen
    const reversedIndex = lastCrystalIndex - i;
    matrixCrystal = matrixCrystals[reversedIndex];
    const {crystal, index} = matrixCrystal;
    return <Spring
      native
      key={crystal.id}
      delay={delays[reversedIndex]}
      from={{x: 0, y: 0, opacity: 1}}
      to={{x: 50, y: targetYPosition, opacity: 0}}
      // It is not garanteed that the spring with the highest delay ends
      // as the last one. But it should be ok.
      onRest={reversedIndex === indexOfMaxDelay ? animationFinishedHandler : null}>
      {
        ({x, y, opacity}) => <animated.div
          style={{
            opacity,
            transform: interpolate([x, y], (x, y) => `translate(${x}px,${y}px)`),
          }}>
          <CrystalSprite
            crystal={crystal}
            index={index} />
        </animated.div>
      }
    </Spring>;
  });
};

FallingCrystals.propTypes = {
  matrixCrystals: propTypes.MATRIX_CRYSTAL_LIST.isRequired,
  delay: PropTypes.number,
  minCrystalDelay: PropTypes.number,
  animationFinishedHandler: PropTypes.func,
};

FallingCrystals.defaultProps = {
  delay: 0,
  minCrystalDelay: 45,
  animationFinishedHandler: undefined,
};

export default memo(FallingCrystals);
