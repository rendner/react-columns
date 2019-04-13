import {
  makeActionCreator,
  makeConstants,
} from '../../utils/CreatorUtils';

const actions = makeConstants('moving-crystals/action', [
  'SET_RESET_POSITION',
  'RESET_POSITION',
  'SET_CRYSTAL_TYPES',
  'CLEAR_CRYSTALS',
  'SET_POSITION',
  'CYCLE_CRYSTALS',
  'INCREMENT_GROUND_TIME',
]);

const actionCreators = {
  setResetPosition: makeActionCreator(
      actions.SET_RESET_POSITION,
      'position',
  ),
  resetPosition: makeActionCreator(
      actions.RESET_POSITION,
  ),
  setPosition: makeActionCreator(
      actions.SET_POSITION,
      'position',
  ),
  setCrystalTypes: makeActionCreator(
      actions.SET_CRYSTAL_TYPES,
      'crystalTypes',
  ),
  clearCrystals: makeActionCreator(
      actions.CLEAR_CRYSTALS,
  ),
  cycleCrystals: makeActionCreator(
      actions.CYCLE_CRYSTALS,
  ),
  incrementGroundTime: makeActionCreator(
      actions.INCREMENT_GROUND_TIME,
  ),
};

export {actionCreators};
export default actions;
