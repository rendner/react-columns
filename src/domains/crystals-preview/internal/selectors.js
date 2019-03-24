import memoizeOne from 'memoize-one'

import { converters as crystalConverters } from '../../crystal'

import { LOCAL_STATE_KEY } from './constants'

const selectLocalState = (state) => {
  return state[LOCAL_STATE_KEY]
}

const convertCrystals = crystals => crystals.map((crystal, index) => crystalConverters.convertCrystal(crystal, index, 0))
const memoizedConvertCrystals = memoizeOne(convertCrystals)


const selectCrystals = (state) => {
  const localState = selectLocalState(state)
  return memoizedConvertCrystals(localState)
}

const selectCrystalTypes = (state) => {
  const localState = selectLocalState(state)
  return localState.map(crystal => crystal.type)
}

export {
  selectCrystals,
  selectCrystalTypes,
}