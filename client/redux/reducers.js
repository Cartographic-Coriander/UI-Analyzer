const initialState = {
  buttonOne: true,
  buttonTwo: true,
  visibleContentComponent: 'Dashboard'
}

export default function reducer (state = initialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'SWITCH_VISIBILITY':
      return newState[action.button] = !newState[action.button];
    case 'TOGGLE_CONTENT_COMPONENT':
      console.log('toggle content component', action)
      newState.visibleContentComponent = action.targetComponent;
      return newState;
    default:
      return state;
  }
  return state
}