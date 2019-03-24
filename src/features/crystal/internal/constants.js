import BlueCrystalSprites from './resources/crystal-qubodup-ccby3-32-blue.png'
import GreenCrystalSprites from './resources/crystal-qubodup-ccby3-32-green.png'
import GreyCrystalSprites from './resources/crystal-qubodup-ccby3-32-grey.png'
import OrangeCrystalSprites from './resources/crystal-qubodup-ccby3-32-orange.png'
import PinkCrystalSprites from './resources/crystal-qubodup-ccby3-32-pink.png'
import YellowCrystalSprites from './resources/crystal-qubodup-ccby3-32-yellow.png'
import { constants as crystalConstants } from '../../../domains/crystal'

export const CRYSTAL_SPRITE_MAP = {
  [crystalConstants.CrystalTypes.NONE]: null,
  [crystalConstants.CrystalTypes.BLUE]: BlueCrystalSprites,
  [crystalConstants.CrystalTypes.GREEN]: GreenCrystalSprites,
  [crystalConstants.CrystalTypes.GREY]: GreyCrystalSprites,
  [crystalConstants.CrystalTypes.ORANGE]: OrangeCrystalSprites,
  [crystalConstants.CrystalTypes.PINK]: PinkCrystalSprites,
  [crystalConstants.CrystalTypes.YELLOW]: YellowCrystalSprites,
}

export const SPRITE_FRAMES = 8
export const CELL_SIZE = 31
export const SPRITE_FRAME_SIZE = CELL_SIZE + 1