import {
  constants as crystalConstants
} from '../../crystal'
import {
  utils as crystalBoardDomainUtils,
  constants as crystalBoardDomainConstants
} from '../../../domains/crystal-board'

export const convertToMatrixIndex = (xPosition, yPosition) => {
  const rowIndex = convertYToRowIndex(yPosition)
  const columnIndex = convertXToColumnIndex(xPosition)
  return crystalBoardDomainUtils.createMatrixIndex(rowIndex, columnIndex)
}

export const convertXToColumnIndex = (xPosition) => {
  return Math.min(crystalBoardDomainConstants.COLUMNS_PER_ROW - 1, Math.floor(xPosition / crystalConstants.CELL_SIZE))
}

export const convertYToRowIndex = (yPosition) => {
  return Math.min(crystalBoardDomainConstants.ROW_COUNT - 1, Math.floor(yPosition / crystalConstants.CELL_SIZE))
}

export const convertRowIndexToY = (rowIndex) => {
  return rowIndex * crystalConstants.CELL_SIZE
}

export const convertColumnIndexToX = (columnIndex) => {
  return columnIndex * crystalConstants.CELL_SIZE
}