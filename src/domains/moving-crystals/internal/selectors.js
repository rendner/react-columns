import memoizeOne from 'memoize-one'

import { converters as crystalConverters} from '../../crystal'

import { LOCAL_STATE_KEY } from './constants'

const selectLocalState = (state) => {
  return state[LOCAL_STATE_KEY]
}

const selectPosition = (state, cellSize) => {
  const { position } = selectLocalState(state)
  //return { x: position.x, y: position.y - (cellSize * 2) }
  return { x: position.x, y: position.y }
}

const convertCrystals = crystals => crystals.map((crystal, index) => crystalConverters.convertCrystal(crystal, index, 0))
const memoizedConvertCrystals = memoizeOne(convertCrystals)
const selectCrystals = (state) => {
  const { crystals } = selectLocalState(state)
  return memoizedConvertCrystals(crystals)
}

const selectCrystalTypes = (state) => {
  const { crystals } = selectLocalState(state)
  return crystals.map(crystal => crystal.type)
}

const selectGroundTime = (state) => {
  return selectLocalState(state).groundTime
}

export {
  selectPosition,
  selectCrystals,
  selectCrystalTypes,
  selectGroundTime,
}