import { makeActionCreator } from '../../utils/ActionCeatorUtils'

const actions = {
  SET_RESET_POSITION: 'MovingCrystalsActions::SET_RESET_POSITION',
  RESET_POSITION: 'MovingCrystalsActions::RESET_POSITION',
  SET_CRYSTAL_TYPES: 'MovingCrystalsActions::SET_CRYSTAL_TYPES',
  CLEAR_CRYSTALS: 'MovingCrystalsActions::CLEAR_CRYSTALS',
  SET_POSITION: 'MovingCrystalsActions::SET_POSITION',
  CYCLE_CRYSTALS: 'MovingCrystalsActions::CYCLE_CRYSTALS',
  INCREMENT_GROUND_TIME: 'MovingCrystalsActions::INCREMENT_GROUND_TIME',
}

const actionCreators = {
  setResetPosition: makeActionCreator(actions.SET_RESET_POSITION, 'position'),
  resetPosition: makeActionCreator(actions.RESET_POSITION),
  setPosition: makeActionCreator(actions.SET_POSITION, 'position'),
  setCrystalTypes: makeActionCreator(actions.SET_CRYSTAL_TYPES, 'crystalTypes'),
  clearCrystals: makeActionCreator(actions.CLEAR_CRYSTALS),
  cycleCrystals: makeActionCreator(actions.CYCLE_CRYSTALS),
  incrementGroundTime: makeActionCreator(actions.INCREMENT_GROUND_TIME),
}

export { actionCreators }
export default actions