import {
  makeActionCreator,
  makeConstants,
} from '../../utils/CreatorUtils';


const actions = makeConstants('game-status/action', [
  'SET_STATUS',
  'RESET',
  'INCREMENT_CLEARED_CRYSTALS',
]);

const actionCreators = {
  reset: makeActionCreator(
      actions.RESET,
  ),
  setStatus: makeActionCreator(
      actions.SET_STATUS,
      'status',
  ),
  incrementClearedCrystals: makeActionCreator(
      actions.INCREMENT_CLEARED_CRYSTALS,
      'incrementBy',
  ),
};

export {actionCreators};
export default actions;
