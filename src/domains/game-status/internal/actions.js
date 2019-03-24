import { makeActionCreator } from '../../utils/ActionCeatorUtils'

const actions = {
  SET_STATUS: 'GameStatusActions::SET_STATUS',
  RESET: 'GameStatusActions::RESET',
  INCREMENT_CLEARED_CRYSTALS: 'GameStatusActions::INCREMENT_CLEARED_CRYSTALS',
}

const actionCreators = {
  reset: makeActionCreator(actions.RESET),
  setStatus: makeActionCreator(actions.SET_STATUS, 'status'),
  incrementClearedCrystals: makeActionCreator(actions.INCREMENT_CLEARED_CRYSTALS, 'incrementBy'),
}

export { actionCreators }
export default actions