import {
  makeActionCreator,
  makeConstants,
} from '../../utils/CreatorUtils';

const actions = makeConstants('crystal-board/action', [
  'CLEAR_CRYSTALS',
  'ADD_DROPPED_CRYSTALS',
  'SET_CURRENT_STATUS',
  'REMOVE_MARKED_CRYSTALS',
]);

const actionCreators = {
  addDroppedCrystals: makeActionCreator(
      actions.ADD_DROPPED_CRYSTALS,
      'crystalTypes',
      'index',
  ),
  clearCrystals: makeActionCreator(
      actions.CLEAR_CRYSTALS,
  ),
  removeMarkedCrystals: makeActionCreator(
      actions.REMOVE_MARKED_CRYSTALS,
  ),
  setCurrentStatus: makeActionCreator(
      actions.SET_CURRENT_STATUS,
      'status',
  ),
};

export {actionCreators};
export default actions;
