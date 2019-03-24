import { makeActionCreator } from '../../utils/ActionCeatorUtils'

const actions = {
  SET_CRYSTAL_TYPES: 'CrystalsPreviewActions::SET_CRYSTAL_TYPES',
}

const actionCreators = {
  setCrystalTypes: makeActionCreator(actions.SET_CRYSTAL_TYPES, 'crystalTypes'),
}

export { actionCreators }
export default actions
