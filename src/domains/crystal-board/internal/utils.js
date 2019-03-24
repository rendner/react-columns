import {
  ROW_COUNT,
  COLUMNS_PER_ROW,
  NO_CRYSTAL_CONST,
} from './constants'

export const isValidCrystal = (crystal) => {
  return crystal !== NO_CRYSTAL_CONST
}

export const createMatrixIndex = (row, column) => {
  return { row, column }
}

export const getMatrixWidth = (matrix) => {
  return matrix[0].length
}

export const getMatrixHeight = (matrix) => {
  return matrix.length
}

export const getMatrixIndex = (matrix, crystalId) => {
  const index = createMatrixIndex(-1, -1)
  matrix.some((row, rowIndex) => row.some((crystal, columnIndex) => {
    if (crystal.id === crystalId) {
      index.row = rowIndex
      index.column = columnIndex
      return true
    }
    return false
  }))
  return index
}

export const createMatrix = (rows, columns, initialValue = undefined) => {
  return Array.from(Array(rows), () => Array(columns).fill(initialValue))
}

export const cloneMatrix = (matrix) => {
  const result = []
  matrix.forEach((row, index) => { result[index] = [...row] })
  return result
}

export const flattenMatrix = (matrix) => {
  return [].concat(...matrix);
}

export const isValidRowIndex = (index) => {
  return index < ROW_COUNT && index > -1
}

export const isValidColumnIndex = (index) => {
  return index < COLUMNS_PER_ROW && index > -1
}

export const isValidMatrixIndex = (index) => {
  return isValidRowIndex(index.row) && isValidColumnIndex(index.column)
}

export const isEmptyColumn = (matrix, index) => {
  return !isValidCrystal(matrix[index.row][index.column])
}

export const isLastRow = (rowIndex) => {
  return rowIndex === ROW_COUNT - 1
}

