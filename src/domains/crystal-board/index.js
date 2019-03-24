import { LOCAL_STATE_KEY } from './internal/constants'
import reducer from './internal/reducer'
import * as constants from './internal/constants'
import * as utils from './internal/utils'
import * as selectors from './internal/selectors'
import * as converters from './internal/converters'
import { actionCreators } from './internal/actions'

const registerDomain = (registry) => {
  registry.registerReducer(LOCAL_STATE_KEY, reducer)
}

export { registerDomain, actionCreators, selectors, converters, constants, utils }