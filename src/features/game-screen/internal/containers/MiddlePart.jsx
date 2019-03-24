import React, { PureComponent } from 'react'

import CrystalBoardContainer from '../../../crystal-board/'
import MovingCrystalsContainer from '../../../moving-crystals/'

class MiddlePart extends PureComponent {

  render() {
    return <div key="div" style={{
      position: 'absolute',
      overflow: 'hidden',
      height: '100%',
      width: '100%',
    }}>
      <CrystalBoardContainer key="board" />
      <MovingCrystalsContainer key="movingCrystals" />
    </div>
  }
}

export default MiddlePart