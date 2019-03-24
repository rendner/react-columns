import {
  createMatrixIndex,
  isValidRowIndex,
  isValidColumnIndex,
} from '../utils'

const computeHorizontal = (rows, columns) => {

  const path = []

  // start top left edge
  let rowIndex = 0
  let columnIndex = 0
  let columnIncrement = 1
  let rowsToCreate = rows

  while (rowsToCreate-- > 0) {

    const pathRow = []

    while (isValidColumnIndex(columnIndex)) {
      pathRow.push(createMatrixIndex(rowIndex, columnIndex))
      columnIndex += columnIncrement
    }

    path.push(pathRow)

    rowIndex++
    columnIncrement *= -1
    columnIndex += columnIncrement
  }

  return path
}

const computeVertical = (rows, columns) => {
  const path = []

  // start top left edge
  let rowIndex = 0
  let columnIndex = 0
  let rowIncrement = 1
  let rowsToCreate = columns

  while (rowsToCreate-- > 0) {

    const pathRow = []

    while (isValidRowIndex(rowIndex)) {
      pathRow.push(createMatrixIndex(rowIndex, columnIndex))
      rowIndex += rowIncrement
    }

    path.push(pathRow)

    columnIndex++
    rowIncrement *= -1
    rowIndex += rowIncrement
  }

  return path
}

const computeDiagonalTopLeft = (rows, columns) => {
  const path = []

  // start top left edge
  let rowIndex = 0
  let columnIndex = 0

  let rowIncrement = 1
  let columnIncrement = -1

  let rowsToCreate = rows + columns - 1

  while (rowsToCreate-- > 0) {

    const pathRow = []

    while (isValidRowIndex(rowIndex) && isValidColumnIndex(columnIndex)) {
      pathRow.push(createMatrixIndex(rowIndex, columnIndex))
      rowIndex += rowIncrement
      columnIndex += columnIncrement
    }

    path.push(pathRow)

    if (rowIndex === rows) {
      rowIndex--
      columnIndex += 2
    }
    if (columnIndex === columns) {
      columnIndex--
      rowIndex += 2
    }
    if (columnIndex === -1) {
      columnIndex++
    }
    if (rowIndex === -1) {
      rowIndex++
    }

    // change direction
    rowIncrement *= -1
    columnIncrement *= -1
  }

  return path
}

const computeDiagonalBottomLeft = (rows, columns) => {

  const path = []

  // start bottom left edge
  let rowIndex = rows - 1
  let columnIndex = 0

  let rowIncrement = -1
  let columnIncrement = -1

  let rowsToCreate = rows + columns - 1

  while (rowsToCreate-- > 0) {

    const pathRow = []

    while (isValidRowIndex(rowIndex) && isValidColumnIndex(columnIndex)) {
      pathRow.push(createMatrixIndex(rowIndex, columnIndex))
      rowIndex += rowIncrement
      columnIndex += columnIncrement
    }

    path.push(pathRow);

    if (columnIndex === columns) {
      columnIndex--
      rowIndex -= 2
    }
    if (rowIndex === rows) {
      rowIndex--
    }
    if (rowIndex === -1) {
      rowIndex++
      columnIndex += 2
    }
    if (columnIndex === -1) {
      columnIndex++
    }

    // change direction
    rowIncrement *= -1
    columnIncrement *= -1
  }

  return path
}

const adjustIndices = (rowOffset, pathMap) => {
  pathMap.forEach(row => row.forEach(index => index.row += rowOffset))
  return pathMap
}

export const createPathMaps = (rowOffset, rows, columns) => {
  const horizontal = adjustIndices(rowOffset, computeHorizontal(rows, columns))
  const vertical = adjustIndices(rowOffset, computeVertical(rows, columns))
  const diagonalTopLeft = adjustIndices(rowOffset, computeDiagonalTopLeft(rows, columns))
  const diagonalBottomLeft = adjustIndices(rowOffset, computeDiagonalBottomLeft(rows, columns))
  return [horizontal, vertical, diagonalTopLeft, diagonalBottomLeft]
}