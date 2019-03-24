import {
  constants as crystalConstants
} from '../../crystal'
import {
  constants as crystalBoardDomainConstants
} from '../../../domains/crystal-board'

export const BOARD_WIDTH = crystalBoardDomainConstants.COLUMNS_PER_ROW * crystalConstants.CELL_SIZE
export const BOARD_HEIGHT = crystalBoardDomainConstants.ROW_COUNT * crystalConstants.CELL_SIZE