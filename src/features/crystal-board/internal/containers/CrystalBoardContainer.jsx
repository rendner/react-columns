import React from 'react'
import { connect } from 'react-redux'

import {
  selectors as statusSelectors,
  constants as statusConstants,
} from '../../../../domains/game-status'
import {
  selectors as crystalBoardSelectors,
} from '../../../../domains/crystal-board'

import { CrystalMatrix } from '../../../crystal'
import { actionCreators as gameActionCreators } from '../../../game'

import Background from '../components/Background'
import RemoveOverlay from '../components/RemoveOverlay'
import GameOverOverlay from '../components/GameOverOverlay'

class CrystalBoardContainer extends React.PureComponent {
  render() {
    return <React.Fragment
      key="fragment">
      <Background
        key="background" />
      <CrystalMatrix
        key="crystalMatrix"
        matrixCrystals={this.props.visibleCrystals}
      />
      <RemoveOverlay
        key="removeOverlay"
        matrixCrystals={this.props.markedCrystals.crystals}
        linkOrigin={this.props.markedCrystals.linkOrigin}
        onAnimationFinished={this.props.removeMarkedCrystals}
      />
      <GameOverOverlay
        key="gameOverOverlay"
        matrixCrystals={this.props.gameOverCrystals}
        onAnimationFinished={this.props.restartGame}
      />
    </React.Fragment>
  }
}

const EMPTY_RESULT = []

const mapStateToProps = state => {
  const visibleCrystals = crystalBoardSelectors.selectVisibleCrystals(state)
  const isGameOver = statusSelectors.selectGameStatus(state) === statusConstants.GameStatus.GAME_OVER
  return {
    visibleCrystals: isGameOver ? EMPTY_RESULT : visibleCrystals,
    markedCrystals: isGameOver ? EMPTY_RESULT : crystalBoardSelectors.selectMarkedCrystals(state),
    gameOverCrystals: isGameOver ? visibleCrystals : EMPTY_RESULT,
  }
}

const mapDispatchToProps = dispatch => ({
  removeMarkedCrystals: () => dispatch(gameActionCreators.removeMarkedCrystals()),
  restartGame: () => dispatch(gameActionCreators.start()),
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(CrystalBoardContainer)