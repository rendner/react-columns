import React, {memo} from 'react';

import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
} from '../constants';
import {
  constants as crystalConstants,
} from '../../../crystal';
import {
  constants as crystalBoardDomainConstants,
} from '../../../../domains/crystal-board';

const generateGridPath = () => {
  let path = '';

  const halfStrokeWidth = 1 / 2;

  let x = 0;
  for (let c = 0; c <= crystalBoardDomainConstants.COLUMNS_PER_ROW; c++) {
    path += `M${halfStrokeWidth + x},${0}`;
    path += `L${halfStrokeWidth + x},${BOARD_HEIGHT}`;
    x += crystalConstants.CELL_SIZE;
  }

  let y = 0;
  for (let r = 0; r <= crystalBoardDomainConstants.ROW_COUNT; r++) {
    path += `M${0},${halfStrokeWidth + y}`;
    path += `L${BOARD_WIDTH},${halfStrokeWidth + y}`;
    y += crystalConstants.CELL_SIZE;
  }

  path += 'Z';

  return path;
};

const Background = () => {
  const gridPath = generateGridPath();
  return (
    <div style={{position: 'absolute'}}>
      <svg width={BOARD_WIDTH} height={BOARD_HEIGHT}>
        <rect x="0" y="0" width="100%" height="100%"
          fill="lightGray" />
        <rect
          x={crystalBoardDomainConstants.MIDDLE_COLUMN_INDEX * crystalConstants.CELL_SIZE}
          y="0"
          width={crystalConstants.CELL_SIZE}
          height="100%"
          fill="#a1c5da"
          fillOpacity="0.4" />
        <g stroke="white" fill="none" strokeWidth="1">
          <path d={gridPath} />
        </g>
        <rect x="0" y="0" width="100%" height="100%"
          fill="none" stroke="darkGray" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default memo(Background);
