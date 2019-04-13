import {
  makeActionCreator,
  makeConstants,
} from '../../utils/CreatorUtils';


const actions = makeConstants('crystals-preview/action', [
  'SET_CRYSTAL_TYPES',
]);

const actionCreators = {
  setCrystalTypes: makeActionCreator(
      actions.SET_CRYSTAL_TYPES,
      'crystalTypes',
  ),
};

export {actionCreators};
export default actions;
