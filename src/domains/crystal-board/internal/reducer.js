import {
  createMatrix,
  cloneMatrix,
} from './utils';
import {
  ROW_COUNT,
  COLUMNS_PER_ROW,
  MIN_CHAINED_LINKS,
  BUFFER_ZONE_ROW_COUNT,
  BoardStatus,
} from './constants';
import {matrixChecker} from './logic/MatrixChecker';
import {createPathMaps} from './logic/MatrixPathCreator';

import actions from './actions';
import {utils as crystalUtils} from '../../crystal';

const createEmptyMatrix = () => {
  return createMatrix(ROW_COUNT + BUFFER_ZONE_ROW_COUNT, COLUMNS_PER_ROW);
};

const adjustRowIndices = (pathMap, rowOffset) => {
  pathMap.forEach((row) =>
    row.forEach((index) =>
      index.row += rowOffset));
};

const createAdjustedPathMaps = () => {
  const pathMaps = createPathMaps(ROW_COUNT, COLUMNS_PER_ROW);
  pathMaps.forEach((entry) => adjustRowIndices(
      entry,
      BUFFER_ZONE_ROW_COUNT,
  )
  );
  return pathMaps;
};

const PATH_MAPS = createAdjustedPathMaps();

const initState = {
  matrix: createEmptyMatrix(),
  status: BoardStatus.READY,
  markedCrystals: {
    ids: [],
    linkOriginId: undefined,
  },
};

export const reducer = (state = initState, {type, payload}) => {
  switch (type) {
    case actions.CLEAR_CRYSTALS:
      return clearCrystals();
    case actions.ADD_DROPPED_CRYSTALS:
      return addDroppedCrystals(state, payload.crystalTypes, payload.index);
    case actions.SET_CURRENT_STATUS:
      return setCurrentStatus(state, payload.status);
    case actions.REMOVE_MARKED_CRYSTALS:
      return removeMarkedCrystals(state);
    default:
      return state;
  }
};

export default reducer;


const removeMarkedCrystals = (state) => {
  const matrix = matrixChecker.removeChains(
      state.matrix,
      state.markedCrystals.ids,
  );
  return markNextChainedCrystals({...state, matrix});
};

const clearMarkedCrystals = (state) => {
  state = {...state, markedCrystals: initState.markedCrystals};
  return setCurrentStatus(state, BoardStatus.CRYSTAL_CHAINS_RESOLVED);
};

const setMarkedCrystals = (state, ids, linkOriginId = undefined) => {
  state = {...state, markedCrystals: {ids, linkOriginId}};
  return setCurrentStatus(
      state,
      ids.length ? BoardStatus.PENDING_MARKED_CRYSTALS
      : BoardStatus.CRYSTAL_CHAINS_RESOLVED,
  );
};

const markNextChainedCrystals = (state) => {
  const markedCrystalIds = matrixChecker.findChains(state.matrix, PATH_MAPS);
  if (markedCrystalIds.length) {
    return setMarkedCrystals(state, markedCrystalIds);
  } else {
    return clearMarkedCrystals(state);
  }
};

const setCurrentStatus = (state, status) => {
  return {...state, status};
};

const clearCrystals = () => {
  return initState;
};

const markChainedCrystals = (state, droppedCrystalIds) => {
  const markedCrystalIds = matrixChecker.findChains(state.matrix, PATH_MAPS);

  let linkOriginId = undefined;
  let links = 0;

  if (markedCrystalIds.length) {
    links = matrixChecker.countLinks(
        state.matrix,
        PATH_MAPS, MIN_CHAINED_LINKS,
    );
    if (links >= MIN_CHAINED_LINKS) {
      linkOriginId = droppedCrystalIds.find(
          (id) => markedCrystalIds.includes(id)
      );
    }
  }

  return setMarkedCrystals(state, markedCrystalIds, linkOriginId);
};

const addDroppedCrystals = (state, crystalTypes, index) => {
  const matrix = cloneMatrix(state.matrix);
  const droppedCrystalIds = [];
  crystalTypes.reverse().forEach((type, i) => {
    const rowIndex = index.row - i + BUFFER_ZONE_ROW_COUNT;
    const crystal = crystalUtils.createCrystal(type);
    matrix[rowIndex][index.column] = crystal;
    droppedCrystalIds.push(crystal.id);
  });

  return markChainedCrystals({...state, matrix}, droppedCrystalIds);
};
