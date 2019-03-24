import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { enableBatching } from 'redux-batched-actions'
import { composeWithDevTools } from 'redux-devtools-extension'

import { registerDomain as registerCrystalBoardDomain } from '../domains/crystal-board'
import { registerDomain as registerMovingCrystalsDomain } from '../domains/moving-crystals'
import { registerDomain as registerGameStatusDomain } from '../domains/game-status'
import { registerDomain as registerCrystalsPreviewDomain } from '../domains/crystals-preview'

import registry from './DomainRegistry'

// register domains
registerCrystalBoardDomain(registry)
registerMovingCrystalsDomain(registry)
registerGameStatusDomain(registry)
registerCrystalsPreviewDomain(registry)

const createReducer = () => {
  return combineReducers({
    ...registry.getReducers(),
  })
}

export const configureStore = () => {
  const store = createStore(
    enableBatching(createReducer()),
    composeWithDevTools(
      applyMiddleware(thunk))
  )

  return store
}