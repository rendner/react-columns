import {makeConstants} from '../../utils/CreatorUtils';

export const LOCAL_STATE_KEY = 'crystalBoard';

export const BoardStatus = makeConstants('crystal-board/status', [
  'CRYSTAL_CHAINS_RESOLVED',
  'PENDING_MARKED_CRYSTALS',
  'READY',
]);

export const NO_CRYSTAL_CONST = undefined;
export const ROW_COUNT = 11;
export const COLUMNS_PER_ROW = 7;
export const MIDDLE_COLUMN_INDEX = 3;
export const BUFFER_ZONE_ROW_COUNT = 3;
export const MIN_CHAINED_LINKS = 3;
export const MIN_CRYSTAL_CHAIN_LENGTH = 3;
