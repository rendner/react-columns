import React, { memo } from 'react'

import CrystalSprite from './CrystalSprite'
import { MATRIX_CRYSTAL_LIST } from './prop-types'

const CrystalMatrix = ({ matrixCrystals }) => {
  return matrixCrystals.map(({ crystal, index }) => <CrystalSprite
      key={crystal.id}
      crystal={crystal}
      index={index}
    />)
}

CrystalMatrix.propTypes = {
  matrixCrystals: MATRIX_CRYSTAL_LIST.isRequired,
}

export default memo(CrystalMatrix)