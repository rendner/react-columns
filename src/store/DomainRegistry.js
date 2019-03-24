
const reducers = {}
const registerReducer = (storeKey, reducer) => {
  reducers[storeKey] = reducer
}

const getReducers = () => ({ ...reducers })

export default {
  registerReducer,
  getReducers
}