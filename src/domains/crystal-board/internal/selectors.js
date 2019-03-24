import memoizeOne from 'memoize-one'

import { LOCAL_STATE_KEY, MIDDLE_COLUMN_INDEX, BUFFER_ZONE_ROW_COUNT } from './constants'
import { convertVisibleCrystals, convertMarkedCrystals } from './converters'
import { isEmptyColumn, createMatrixIndex } from './utils'

const selectLocalState = (state) => {
  return state[LOCAL_STATE_KEY]
}

const memoizedConvertVisibleCrystals = memoizeOne(convertVisibleCrystals)
const selectVisibleCrystals = (state) => {
  const matrix = selectMatrix(state)
  const markedCrystalIds = selectMarkedCrystalIds(state)
  return memoizedConvertVisibleCrystals(matrix, markedCrystalIds)
}

const memoizedConvertMarkedCrystals = memoizeOne(convertMarkedCrystals)
const selectMarkedCrystals = (state) => {
  const matrix = selectMatrix(state)
  const markedCrystalIds = selectMarkedCrystalIds(state)
  const localState = selectLocalState(state)
  const linkOriginId = localState.markedCrystals.linkOriginId
  return memoizedConvertMarkedCrystals(matrix, markedCrystalIds, linkOriginId)
}

const selectMarkedCrystalIds = (state) => {
  const localState = selectLocalState(state)
  return localState.markedCrystals.ids
}

const selectBoardStatus = (state) => {
  return selectLocalState(state).status
}

const memoizedSlice = memoizeOne(matrix => matrix.slice(BUFFER_ZONE_ROW_COUNT))
const selectMatrix = (state) => {
  const matrix = selectMatrixIncludingBuffer(state)
  return memoizedSlice(matrix)
}

const selectMatrixIncludingBuffer = (state) => {
  return selectLocalState(state).matrix
}

const ENTER_MATRIX_INDEX = createMatrixIndex(BUFFER_ZONE_ROW_COUNT, MIDDLE_COLUMN_INDEX)
const isBoardFilled = (state) => {
  const matrix = selectMatrixIncludingBuffer(state)
  return !isEmptyColumn(matrix, ENTER_MATRIX_INDEX)
}

export {
  isBoardFilled,
  selectBoardStatus,
  selectMatrix,
  selectVisibleCrystals,
  selectMarkedCrystals,
  selectMarkedCrystalIds,
}