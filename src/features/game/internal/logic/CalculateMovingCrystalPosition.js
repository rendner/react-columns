import {
  constants as crystalBoardConstants,
  utils as crystalBoardUtils,
} from '../../../../domains/crystal-board'
import { constants as movingCrystalConstants } from '../../../../domains/moving-crystals'
import { constants as gameStatusConstants } from '../../../../domains/game-status'
import KeyState, { Key } from '../../../utils/KeyState'
import Easing from '../../../utils/Easing'

import { constants as crystalFeatureConstants } from '../../../crystal'
import { utils as crystalBoardFeatureUtils } from '../../../crystal-board'

const LAST_VALID_Y_POS = crystalFeatureConstants.CELL_SIZE * (crystalBoardConstants.ROW_COUNT - 1)

export const calculateNextPosition = (currentPosition, matrix, speedLevel) => {
  const newPosition = { x: currentPosition.x, y: currentPosition.y }
  newPosition.x = calculateNewXPosition(matrix, newPosition)
  newPosition.y = calculateNewYPosition(matrix, newPosition, speedLevel)

  return newPosition
}

const calculateNewYPosition = (matrix, position, speedLevel) => {

  let movedDistance = 2 + Math.floor(gameStatusConstants.MAX_SPEED_LEVEL * Easing.easeInQuad(speedLevel / gameStatusConstants.MAX_SPEED_LEVEL))

  if (KeyState.isDown(Key.DOWN)) {
    movedDistance += movingCrystalConstants.FAST_MOVE_DOWN
  }

  let newYPosition = Math.min(position.y + movedDistance, LAST_VALID_Y_POS)

  if (newYPosition !== position.y) {

    // get row index for the bottom part of the crystal
    const newRowIndex = calculateRowIndexOfCrystalBottom(newYPosition)
    const currentRowIndex = calculateRowIndexOfCrystalBottom(position.y)

    if (newRowIndex !== currentRowIndex) {
      const currentColumnIndex = crystalBoardFeatureUtils.convertXToColumnIndex(position.x)
      const matrixIndex = crystalBoardUtils.createMatrixIndex(newRowIndex, currentColumnIndex)

      if (!isValidEmptyIndex(matrix, matrixIndex)) {

        // reset to the last possible valid y position
        while (!isValidEmptyIndex(matrix, matrixIndex)) {
          if (matrixIndex.row === currentRowIndex) {
            break;
          }
          matrixIndex.row--
        }

        newYPosition = crystalBoardFeatureUtils.convertRowIndexToY(matrixIndex.row)
      }
    }
  }

  return newYPosition
}

const calculateNewXPosition = (matrix, position) => {
  const columnIndex = crystalBoardFeatureUtils.convertXToColumnIndex(position.x)
  const rowIndex = calculateRowIndexOfCrystalBottom(position.y)

  let newColumnIndex = columnIndex

  if (KeyState.isDelayedDone(Key.RIGHT)) {
    newColumnIndex = Math.min(columnIndex + 1, crystalBoardConstants.COLUMNS_PER_ROW - 1)
  } else if (KeyState.isDelayedDone(Key.LEFT)) {
    newColumnIndex = Math.max(columnIndex - 1, 0)
  }

  if (newColumnIndex !== columnIndex) {
    const matrixIndex = crystalBoardUtils.createMatrixIndex(rowIndex, newColumnIndex)

    if (!crystalBoardUtils.isEmptyColumn(matrix, matrixIndex)) {
      // illegal move, revert move
      newColumnIndex = columnIndex
    }
  }

  return newColumnIndex === columnIndex ? position.x : crystalBoardFeatureUtils.convertColumnIndexToX(newColumnIndex)
}

const isValidEmptyIndex = (matrix, matrixIndex) => {
  return crystalBoardUtils.isValidMatrixIndex(matrixIndex) && crystalBoardUtils.isEmptyColumn(matrix, matrixIndex)
}

const calculateRowIndexOfCrystalBottom = (yPositionOfCrystal) => {
  const rowOfCrystal = crystalBoardFeatureUtils.convertYToRowIndex(yPositionOfCrystal)
  if (rowOfCrystal >= 0) {
    const yPositionOfRow = crystalBoardFeatureUtils.convertRowIndexToY(rowOfCrystal)
    const movedDistanceInRow = yPositionOfCrystal - yPositionOfRow
    if (movedDistanceInRow > 0 && !crystalBoardUtils.isLastRow(rowOfCrystal) && crystalBoardUtils.isValidRowIndex(rowOfCrystal)) {
      // movedDistance == amount of pixel which also overlay the next row
      return rowOfCrystal + 1
    }
    return rowOfCrystal
  }

  // the crystal starts above the board this lead to an negative (invalid index)
  // to make the algorithm work, the invalid index is adjusted
  return 0
}