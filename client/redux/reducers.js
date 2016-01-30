const buttonInitialState = {
  buttonOne: true,
  buttonTwo: true,
  visibleContentComponent: 'Dashboard',
}

const noteInitialState = {
  notes: []
}

export function buttonReducer (state = buttonInitialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'SWITCH_VISIBILITY':
      return newState[action.button] = !newState[action.button];
    case 'TOGGLE_CONTENT_COMPONENT':
      newState.visibleContentComponent = action.targetComponent;
      return newState;
    default:
      return state;
  }
  return state
}

export function noteReducer (state = noteInitialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'ADD_NOTE':
      var newComments = state['notes'].slice();
      newComments.push(action.note);
      newState['notes'] = newComments;
      return newState;
    default:
      return state;
  }
  return state
}