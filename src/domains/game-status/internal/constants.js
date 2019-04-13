import {makeConstants} from '../../utils/CreatorUtils';

export const LOCAL_STATE_KEY = 'gameState';

export const GameStatus = makeConstants('game-status/status', [
  'GAME_OVER',
  'RUNNING',
  'UNINITIALIZED',
]);

export const MAX_SPEED_LEVEL = 7;
export const MIN_SPEED_LEVEL = 1;
export const RECOVERY_SPEED_LEVEL = 4;

