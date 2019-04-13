import actions from './actions';
import {CRYSTAL_COUNT} from './constants';
import {utils as crystalUtils} from '../../crystal';

const initState = [];

export const reducer = (state = initState, {type, payload}) => {
  switch (type) {
    case actions.SET_CRYSTAL_TYPES:
      return setCrystalTypes(state, payload.crystalTypes);
    default:
      return state;
  }
};

export default reducer;


const setCrystalTypes = (state, crystalTypes) => {
  const types = sanitizedTypes(crystalTypes);
  return types.map((type) => crystalUtils.createCrystal(type));
};

const sanitizedTypes = (types) => {
  return types.length > CRYSTAL_COUNT ? types.slice(0, CRYSTAL_COUNT) : types;
};
