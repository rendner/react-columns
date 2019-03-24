import { generateID } from '../../utils/IdUtils'

import { CrystalTypes } from './constants'

const CRYSTAL_TYPES_COUNT = Object.keys(CrystalTypes).length

const createCrystal = (type = undefined) => {
  return {
    id: generateID(),
    type,
  }
}

const getRandomCrystalType = () => {
  return Math.floor(Math.random() * CRYSTAL_TYPES_COUNT)
}

export {
  createCrystal,
  getRandomCrystalType,
}