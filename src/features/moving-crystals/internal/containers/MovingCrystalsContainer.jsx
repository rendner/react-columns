import React from 'react'
import { connect } from 'react-redux'

import { selectors as movingCrystalSelectors } from '../../../../domains/moving-crystals'
import { AnimatedCrystalMatrix, constants as crystalConstants } from '../../../crystal'

class MovingCrystalsContainer extends React.PureComponent {
  render() {
    const { position, crystals } = this.props
    return <div
      key="div"
      style={{
        position: 'absolute',
        top: `${position.y - (crystalConstants.CELL_SIZE * 2)}px`,
        left: `${position.x}px`
      }}>
      <AnimatedCrystalMatrix
        key="matrix"
        matrixCrystals={crystals}
      />
    </div>
  }
}

const mapStateToProps = state => {
  return {
    crystals: movingCrystalSelectors.selectCrystals(state),
    position: movingCrystalSelectors.selectPosition(state, crystalConstants.CELL_SIZE),
  }
}

const mapDispatchToProps = null

export default connect(
  mapStateToProps, mapDispatchToProps
)(MovingCrystalsContainer)