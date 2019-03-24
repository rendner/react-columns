// creates an action creator which creates actions with a payload
export const makeActionCreator = (type, ...payloadArgNames) => {
  return function(...args) {
    const action = { type, payload: {} }
    payloadArgNames.forEach((argName, index) => {
      action.payload[argName] = args[index]
    })
    return action
  }
}