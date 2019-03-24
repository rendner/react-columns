import actions from './actions'
import { CRYSTAL_COUNT } from './constants'
import { utils as crystalUtils } from '../../crystal'

const initState = {
  crystals: [],
  groundTime: 0,
  position: { x: 0, y: 0 },
  resetPosition: { x: 0, y: 0 },
}

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case actions.SET_RESET_POSITION:
      return setResetPosition(state, payload.position)
    case actions.SET_POSITION:
      return setPosition(state, payload.position)
    case actions.SET_CRYSTAL_TYPES:
      return setCrystalTypes(state, payload.crystalTypes)
    case actions.CYCLE_CRYSTALS:
      return cycleCrystals(state)
    case actions.CLEAR_CRYSTALS:
      return setCrystalTypes(state, [])
    case actions.INCREMENT_GROUND_TIME:
      return incrementGroundTime(state)
    case actions.RESET_POSITION:
      return setPosition(state, state.resetPosition)
    default:
      return state
  }
}

export default reducer


const setCrystalTypes = (state, crystalTypes) => {
  const types = sanitizedTypes(crystalTypes)
  const crystals = types.map(type => crystalUtils.createCrystal(type))
  return { ...state, crystals, position: state.resetPosition, groundTime: initState.groundTime }
}

const sanitizedTypes = (types) => {
  return types.length > CRYSTAL_COUNT ? types.slice(0, CRYSTAL_COUNT) : types
}

const setPosition = (state, position) => {
  return { ...state, position }
}

const setResetPosition = (state, position) => {
  return { ...state, resetPosition: position }
}

const cycleCrystals = (state) => {
  const crystals = [...state.crystals]
  crystals.unshift(crystals.pop())
  return { ...state, crystals }
}

const incrementGroundTime = (state) => {
  return { ...state, groundTime: state.groundTime + 1 }
}
