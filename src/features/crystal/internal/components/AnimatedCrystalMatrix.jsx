import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { SpriteLooper } from '../../../sprite'

import CrystalSprite from './CrystalSprite'
import { MATRIX_CRYSTAL_LIST } from './prop-types'
import { SPRITE_FRAMES } from '../constants'

const AnimatedCrystalMatrix = ({ animate, matrixCrystals }) => {
  return matrixCrystals && matrixCrystals.length ?
    <SpriteLooper
      key="looper"
      playing={animate}
      frameCount={SPRITE_FRAMES}
      frameDelay={1000 / SPRITE_FRAMES}>
      {
        frameIndex => matrixCrystals.map(({ crystal, index }) => <CrystalSprite
          key={crystal.id}
          crystal={crystal}
          index={index}
          frameIndex={frameIndex}
        />)
      }
    </SpriteLooper>
    : null
}

AnimatedCrystalMatrix.propTypes = {
  matrixCrystals: MATRIX_CRYSTAL_LIST,
  animate: PropTypes.bool,
}

AnimatedCrystalMatrix.defaultProps = {
  animate: true
}

export default memo(AnimatedCrystalMatrix)