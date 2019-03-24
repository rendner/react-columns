import memoizeOne from 'memoize-one'

import { LOCAL_STATE_KEY, MIDDLE_COLUMN_INDEX } from './constants'
import { convertVisibleCrystals, convertMarkedCrystals } from '../../../domains/crystal-board/internal/converters'
import { isEmptyColumn, createBoardIndex } from './utils'

const selectLocalState = (state) => {
  return state[LOCAL_STATE_KEY]
}

const memoizedConvertVisibleCrystals = memoizeOne(convertVisibleCrystals)
const selectVisibleCrystals = (state) => {
  const localState = selectLocalState(state)
  const crystalMatrix = localState.crystals
  const markedCrystalIds = localState.markedCrystals.ids
  return memoizedConvertVisibleCrystals(crystalMatrix, markedCrystalIds)
}

const memoizedConvertMarkedCrystals = memoizeOne(convertMarkedCrystals)
const selectMarkedCrystals = (state) => {
  const crystalMatrix = selectCrystalMatrix(state)
  const markedCrystalIds = selectMarkedCrystalIds(state)
  const localState = selectLocalState(state)
  const originId = localState.markedCrystals.originId
  return memoizedConvertMarkedCrystals(crystalMatrix, markedCrystalIds, originId)
}

const selectMarkedCrystalIds = (state) => {
  const localState = selectLocalState(state)
  return localState.markedCrystals.ids
}

const selectBoardStatus = (state) => {
  return selectLocalState(state).status
}

const selectCrystalMatrix = (state) => {
  return selectLocalState(state).crystals
}

const ENTER_MATRIX_INDEX = createBoardIndex(0, MIDDLE_COLUMN_INDEX)
const isBoardFilled = (state) => {
  const crystalMatrix = selectCrystalMatrix(state)
  return !isEmptyColumn(crystalMatrix, ENTER_MATRIX_INDEX)
}

export {
  isBoardFilled,
  selectBoardStatus,
  selectCrystalMatrix,
  selectVisibleCrystals,
  selectMarkedCrystals,
  selectMarkedCrystalIds,
}