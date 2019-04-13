import React, {memo} from 'react';
import PropTypes from 'prop-types';

import SpriteSheet from '../../../sprite';

import {
  CRYSTAL,
  MATRIX_INDEX,
} from './prop-types';
import {
  CELL_SIZE,
  CRYSTAL_SPRITE_MAP,
  SPRITE_FRAME_SIZE,
} from '../constants';

const CrystalSprite = ({crystal, index, frameIndex}) => {
  const spriteSource = CRYSTAL_SPRITE_MAP[crystal.type];
  return spriteSource ?
    <SpriteSheet
      key="sprite"
      x={index.column * CELL_SIZE}
      y={index.row * CELL_SIZE}
      spriteSource={spriteSource}
      spriteWidth={SPRITE_FRAME_SIZE}
      spriteHeight={SPRITE_FRAME_SIZE}
      spriteColumnIndex={frameIndex} />
    :
    null;
};

CrystalSprite.propTypes = {
  frameIndex: PropTypes.number,
  crystal: CRYSTAL.isRequired,
  index: MATRIX_INDEX.isRequired,
};

CrystalSprite.defaultProps = {
  frameIndex: 0,
};

export default memo(CrystalSprite);
