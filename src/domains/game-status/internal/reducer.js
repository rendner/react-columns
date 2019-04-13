import actions from './actions';
import {
  GameStatus,
  MIN_SPEED_LEVEL,
  MAX_SPEED_LEVEL,
  RECOVERY_SPEED_LEVEL,
} from './constants';

const initState = {
  status: GameStatus.UNINITIALIZED,
  speedLevel: MIN_SPEED_LEVEL,
  level: 1,
  clearedCrystalsCount: 0,
};

const calculateNextLevelThreshold = (level) => {
  return level * 30;
};

export const reducer = (state = initState, {type, payload}) => {
  switch (type) {
    case actions.SET_STATUS:
      return setGameStatus(state, payload.status);
    case actions.INCREMENT_CLEARED_CRYSTALS:
      return incrementClearedCrystals(state, payload.incrementBy);
    case actions.RESET:
      return reset(state);
    default:
      return state;
  }
};

export default reducer;

const reset = (state) => {
  return initState;
};

const setGameStatus = (state, status) => {
  return {...state, status};
};

const incrementClearedCrystals = (state, incrementBy) => {
  const clearedCrystalsCount = state.clearedCrystalsCount + incrementBy;
  const level = recalcLevel(state.level, clearedCrystalsCount);
  const speedLevel = level === state.level ?
    state.speedLevel
    :
    getNextSpeedLevel(state.speedLevel);
  return {
    ...state,
    clearedCrystalsCount,
    level,
    speedLevel,
  };
};

const recalcLevel = (currentLevel, clearedCrystals) => {
  const threshold = calculateNextLevelThreshold(currentLevel);
  return clearedCrystals < threshold ? currentLevel : currentLevel + 1;
};

const getNextSpeedLevel = (speedLevel) => {
  if (speedLevel >= MAX_SPEED_LEVEL) {
    return Math.max(MIN_SPEED_LEVEL, RECOVERY_SPEED_LEVEL);
  }

  return Math.min(MAX_SPEED_LEVEL, speedLevel + 1);
};
