import { batchActions } from 'redux-batched-actions'

import {
  utils as crystalUtils
} from '../../../domains/crystal'
import {
  actionCreators as crystalPreviewActions,
  constants as crystalPreviewConstants,
  selectors as crystalPreviewSelectors,
} from '../../../domains/crystals-preview'
import {
  actionCreators as movingCrystalActions,
  constants as movingCrystalConstants,
  selectors as movingCrystalSelectors,
} from '../../../domains/moving-crystals'
import {
  actionCreators as crystalBoardActions,
  constants as crystalBoardConstants,
  selectors as crystalBoardSelectors,
} from '../../../domains/crystal-board'
import {
  actionCreators as gameStatusActions,
  constants as gameStatusConstants,
  selectors as gameStatusSelectors,
} from '../../../domains/game-status'

import { utils as crystalBoardFeatureUtils } from '../../crystal-board'
import { constants as crystalFeatureConstants } from '../../crystal'

import KeyState, { Key } from '../../utils/KeyState'

import { calculateNextPosition } from './logic/CalculateMovingCrystalPosition'

const { BoardStatus } = crystalBoardConstants
const { GameStatus } = gameStatusConstants

const update = () => {
  return (dispatch, getState) => {

    let batchedActions = []
    const state = getState()

    if (crystalBoardSelectors.selectBoardStatus(state) === BoardStatus.CRYSTAL_CHAINS_RESOLVED) {
      if (crystalBoardSelectors.isBoardFilled(state)) {
        batchedActions.push(gameStatusActions.setStatus(GameStatus.GAME_OVER))
      } else {
        // set the current preview as new moving-crystals data
        // don't generate a new preview, because the moving-crystals are out of the visible
        // area and the player can't see the crystals if the preview is update to early
        const previewCrystalTypes = crystalPreviewSelectors.selectCrystalTypes(state)
        batchedActions.push(movingCrystalActions.setCrystalTypes(previewCrystalTypes))
        batchedActions.push(crystalBoardActions.setCurrentStatus(BoardStatus.READY))
      }
    }
    else if (crystalBoardSelectors.selectBoardStatus(state) === BoardStatus.READY) {
      if (KeyState.isInitialDown(Key.UP)) {
        batchedActions.push(movingCrystalActions.cycleCrystals())
      }

      updateMovingCrystalsPosition(state, batchedActions)
    }

    KeyState.clearWasPressedState()
    dispatch(batchActions(batchedActions))
  }
}

const removeMarkedCrystals = () => {
  return (dispatch, getState) => {

    const batchedActions = []
    const state = getState()

    const markedCrystalsIds = crystalBoardSelectors.selectMarkedCrystalIds(state)
    const crystalCount = markedCrystalsIds.length

    batchedActions.push(gameStatusActions.incrementClearedCrystals(crystalCount))
    batchedActions.push(crystalBoardActions.removeMarkedCrystals())

    dispatch(batchActions(batchedActions))
  }
}

const init = () => {
  return (dispatch, getState) => {

    const batchedActions = []

    const cellSize = crystalFeatureConstants.CELL_SIZE
    const resetPosition = { x: crystalBoardConstants.MIDDLE_COLUMN_INDEX * cellSize, y: -cellSize }
    batchedActions.push(movingCrystalActions.setResetPosition(resetPosition))

    dispatch(batchActions(batchedActions))
  }
}

const start = () => {
  return (dispatch, getState) => {

    const batchedActions = []

    const previewCrystalTypes = createListOfRandomCrystalTypes(crystalPreviewConstants.CRYSTAL_COUNT)
    const movingCrystalTypes = createListOfRandomCrystalTypes(movingCrystalConstants.CRYSTAL_COUNT)

    batchedActions.push(gameStatusActions.reset())
    batchedActions.push(gameStatusActions.setStatus(GameStatus.RUNNING))
    batchedActions.push(crystalBoardActions.clearCrystals())
    batchedActions.push(crystalPreviewActions.setCrystalTypes(previewCrystalTypes))
    batchedActions.push(movingCrystalActions.resetPosition())
    batchedActions.push(movingCrystalActions.setCrystalTypes(movingCrystalTypes))

    dispatch(batchActions(batchedActions))
  }
}

const updateMovingCrystalsPosition = (state, batchedActions) => {

  const position = movingCrystalSelectors.selectPosition(state, crystalFeatureConstants.CELL_SIZE)
  const groundTime = movingCrystalSelectors.selectGroundTime(state)
  const matrix = crystalBoardSelectors.selectMatrix(state)
  const speedLevel = gameStatusSelectors.selectSpeedLevel(state)
  const newPosition = calculateNextPosition(position, matrix, speedLevel)

  const hasMovedDown = newPosition.y !== position.y
  const hasMovedHorizontal = newPosition.x !== position.x

  if (hasMovedDown || hasMovedHorizontal) {
    batchedActions.push(movingCrystalActions.setPosition(newPosition))

    // generate a new crystals-preview if the current moving-crystals become visible
    const prevRowIndex = crystalBoardFeatureUtils.convertYToRowIndex(position.y)
    if (prevRowIndex === -1) {
      const newRowIndex = crystalBoardFeatureUtils.convertYToRowIndex(newPosition.y)
      if (prevRowIndex !== newRowIndex) {
        const crystalTypes = createListOfRandomCrystalTypes(crystalPreviewConstants.CRYSTAL_COUNT)
        batchedActions.push(crystalPreviewActions.setCrystalTypes(crystalTypes))
      }
    }

  } else if (!hasMovedDown) {
    let dropCrystals = false

    if (KeyState.isDown(Key.DOWN)) {
      dropCrystals = true
    }
    else if (groundTime >= movingCrystalConstants.GROUND_TIME_THRESHOLD) {
      dropCrystals = true
    }

    if (dropCrystals) {
      const crystalTypes = movingCrystalSelectors.selectCrystalTypes(state)
      const matrixIndex = crystalBoardFeatureUtils.convertToMatrixIndex(position.x, position.y)
      batchedActions.push(crystalBoardActions.addDroppedCrystals(crystalTypes, matrixIndex))
      batchedActions.push(movingCrystalActions.clearCrystals())
    } else {
      batchedActions.push(movingCrystalActions.incrementGroundTime())
    }
  }
}

const createListOfRandomCrystalTypes = (numCrystalTypes) => {
  const result = []
  for (let i = 0; i < numCrystalTypes; i++) {
    result.push(crystalUtils.getRandomCrystalType())
  }
  return result
}

const actionCreators = {
  init,
  start,
  update,
  removeMarkedCrystals,
}

export { actionCreators }