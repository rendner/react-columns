import { LOCAL_STATE_KEY } from './constants'

const selectLocalState = (state) => {
  return state[LOCAL_STATE_KEY]
}

const selectLevelCount = (state) => {
  return selectLocalState(state).level
}

const selectSpeedLevel = (state) => {
  return selectLocalState(state).speedLevel
}

const selectGameStatus = (state) => {
  return selectLocalState(state).status
}

const selectClearedCrystalsCount = (state) => {
  return selectLocalState(state).clearedCrystalsCount
}

export {
  selectClearedCrystalsCount,
  selectGameStatus,
  selectLevelCount,
  selectSpeedLevel,
}